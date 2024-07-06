import { HeaderType, isValidUUID } from '@ihf-rivendell/qa';
import { expect } from '@playwright/test';
import { leadsRepository } from '@repositories/repositories';
import { logger } from '../../reporters/custom-logger';
import { loansHelper } from '../loans/loans-helper';
import { LeadInterface, TypeOfProduct } from './builder/leads-builder';

class LeadsHelper {
  async create(lead: any): Promise<void> {
    const { type: documentType, number: documentNumber } = lead.customer.identityDocument!;

    await leadsRepository.create(this.buildLead(lead));

    const { body: search } = await this.searchLeads(documentType!, documentNumber!);

    expect(search.length, JSON.stringify(search, null, 2)).toBeGreaterThan(0);
  }

  async searchLeads(documentType: string, documentNumber: string) {
    const request = {
      lead: {
        customer: {
          identityDocument: {
            type: documentType,
            number: documentNumber,
          },
        },
      },
      headerType: HeaderType.Internal,
      isActive: true,
    };
    return leadsRepository.findByIdentityDocument(request);
  }

  async createSale(originalLead: Partial<LeadInterface>): Promise<void> {
    const { type: documentType, number: documentNumber } = originalLead.customer!.identityDocument;

    const leads = await this.searchLeads(documentType as string, documentNumber as string);
    const newLead = leads.body.find((row: any) => row.type === TypeOfProduct.NEW && isValidUUID(row.id));

    const request = await this.buildSale({
      ...newLead,
      term: originalLead.term,
      paymentDay: originalLead.paymentDay,
      metadata: originalLead.metadata,
    });

    const { statusCode } = await leadsRepository.createSale(request);

    expect(statusCode, JSON.stringify(statusCode, null, 2)).toBe(200);

    await loansHelper.search(documentType as string, documentNumber as string);
  }

  private async buildSale(lead: LeadInterface) {
    return {
      id: lead.id,
      customer: { id: lead.customer.id },
      amount: Number(lead.amount),
      currency: lead.currency,
      term: lead.term,
      paymentDay: lead.paymentDay,
      metadata: lead.metadata,
    };
  }

  private buildLead(lead: LeadInterface) {
    return {
      campaignId: lead.campaignId,
      product: {
        type: 'LOAN',
        subType: lead.product.subType,
      },
      customer: {
        identityDocument: {
          type: lead.customer.identityDocument?.type,
          number: lead.customer.identityDocument?.number,
        },
      },
      amount: Number(lead.amount),
      interestRate: Number(lead.interestRate),
      annualNominalRate: lead.annualNominalRate,
      currency: lead.currency,
      expirationDate: 86400000 + Date.now(),
      creationDate: Date.now(),
      status: lead.status,
      type: lead.type,
    };
  }

  async removeLead(documentType: string, documentNumber: string): Promise<void> {
    try {
      await leadsRepository.deleteByIdentityDocument({
        customer: {
          identityDocument: {
            type: documentType,
            number: documentNumber,
          },
        },
      });
      logger.info(`Lead was removed with ${documentType} ${documentNumber}.`);
    } catch {
      /* empty */
    }
  }
}

export const leadsHelper = new LeadsHelper();
