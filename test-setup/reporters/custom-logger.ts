import { Reporter, TestCase, TestError, TestResult } from '@playwright/test/reporter';
import Table from 'cli-table3';
import winston from 'winston';

const customColors = {
  info: 'blue',
  error: 'red',
};
winston.addColors(customColors);

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`),
  ),
  transports: [new winston.transports.Console()],
});

export default class CustomLogger implements Reporter {
  private results: {
    [specName: string]: { passed: number; pending: number; failed: number; totalTests: number; duration?: number };
  } = {};

  private totalTests: number = 0;

  private totalPassed: number = 0;

  private totalFailed: number = 0;

  private totalPending: number = 0;

  private totalTime: number = 0;

  onTestBegin(test: TestCase): void {
    logger.info(`\x1b[32mRunning Test Case: ${test.title}\x1b[0m`);
    this.results[test.title] = { passed: 0, pending: 0, failed: 0, totalTests: 0 };
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.results[test.title].duration = result.duration;
    switch (result.status) {
      case 'passed':
        this.results[test.title].passed += 1;
        this.totalPassed += 1;
        logger.info(`\x1b[32mTest Case Passed: ${test.title}\x1b[0m`);
        break;
      case 'skipped':
        this.results[test.title].pending += 1;
        this.totalPending += 1;
        break;
      case 'failed':
        this.results[test.title].failed += 1;
        this.totalFailed += 1;
        logger.error(`Test Case Failed: ${test.title} Error: ${result.error?.message}`);
        break;
      default:
    }

    this.results[test.title].totalTests += 1;
    this.totalTests += 1;
    this.totalTime += result.duration || 0;
  }

  onError(error: TestError): void {
    logger.error(error.message);
    this.totalFailed += 1;
  }

  async onEnd(): Promise<void> {
    logger.info('Test Execution Summary');

    const table = new Table({
      head: ['Test', 'Duration', 'Tests', 'Passing', 'Failing', 'Pending', 'Skipped', 'Total BNPL', 'Total LD'],
      style: { head: ['cyan'] },
    });

    Object.entries(this.results).forEach(([specName, { passed, pending, failed, totalTests, duration }]) => {
      const skipped = totalTests - (passed + pending + failed);

      table.push([
        specName,
        duration ? `${(duration / 1000).toFixed(2)}s` : '-',
        totalTests.toString(),
        passed.toString(),
        failed.toString(),
        pending.toString(),
        skipped.toString(),
      ]);
    });

    logger.info(`\n${table.toString()}`);
    logger.info(`Total Tests: ${this.totalTests}`);
    logger.info(`Total Passed: ${this.totalPassed}`);
    logger.info(`Total Failed: ${this.totalFailed}`);
    logger.info(`Total Pending: ${this.totalPending}`);
    logger.info(`Total Duration: ${this.formatTime(this.totalTime)}`);
  }

  private formatTime(milliseconds: number): string {
    const seconds = milliseconds / 1000;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(0);
    return `${minutes}m ${remainingSeconds}s`;
  }
}
