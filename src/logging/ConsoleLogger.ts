import { Runner } from '../runners/Runner';
import { Logger } from './Logger';

export class ConsoleLogger implements Logger {
    log(level: 'log' | 'info' | 'warn' | 'error', message: any, runner?: Runner) {
        throw new Error('Method not implemented.');
    }
}

