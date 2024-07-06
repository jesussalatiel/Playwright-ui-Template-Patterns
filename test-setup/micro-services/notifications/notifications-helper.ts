import { sleep } from '@ihf-rivendell/qa';
import { notificationsRepository } from '@repositories/repositories';

class NotificationsHelper {
  async getCodeNotification(mobile: string): Promise<string | null> {
    const userVerification: RegExp[] = [/[A-Za-z0-9]{8}/g];
    let codeVerification: string | null = null;
    const maxRetries = 4;
    const delay = 500;

    for (let tries = 0; tries < maxRetries; tries += 1) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await sleep(delay);
        // eslint-disable-next-line no-await-in-loop
        const notification = await notificationsRepository.findNotification(mobile);

        for (let regex = 0; regex < userVerification.length; regex += 1) {
          const match = notification.match(userVerification[regex]);
          const code = typeof match[1] !== 'object' ? match[1] : '';
          if (code && code.length > 1) {
            // eslint-disable-next-line prefer-destructuring
            codeVerification = code;
            break;
          }
        }
      } catch {
        /* empty */
      }
    }

    return codeVerification;
  }
}

export const notificationsHelper = new NotificationsHelper();
