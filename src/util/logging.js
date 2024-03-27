import { LOG_LEVEL } from "./environment";

/** Signature of a logging function */
// export interface LogFn {
//     (message?: any, ...optionalParams: any[]): void;
//   }

//   /** Basic logger interface */
//   export interface Logger {
//     log: LogFn;
//     warn: LogFn;
//     error: LogFn;
//   }

/** Logger which outputs to the browser console */

const NO_OP = (message, ...optionalParams) => {};


//   export class ConsoleLogger implements Logger {
export class ConsoleLogger {

    constructor(options) {
        const { level } = options || {};

        this.error = console.error.bind(console);

        if (level === 'error') {
            this.warn = NO_OP;
            this.log = NO_OP;

            return;
        }

        this.warn = console.warn.bind(console);

        if (level === 'warn') {
            this.log = NO_OP;

            return;
        }

        this.log = console.log.bind(console);
    }
}

console.log(LOG_LEVEL);
export const logger = new ConsoleLogger({ level: LOG_LEVEL });
