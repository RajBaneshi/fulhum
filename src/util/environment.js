export const APP_ENV = import.meta.env.VITE_APP_ENV === 'production' ? 'production' : 'development';
export const LOG_LEVEL = APP_ENV === 'production' ? 'warn' : 'log';