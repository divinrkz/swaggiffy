import { Runner } from '../lib/runners/runner';


export interface Logger {
     /**
     * Perform logging using given logger, or by default to the console.
     * Log has its own level and message.
     */
      log(level: "log"|"info"|"warn"|'error', message: any, runner?: Runner): any;
}