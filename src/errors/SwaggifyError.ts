export class SwaggifyError extends Error {
  constructor(message:string = 'An unexpected error occurred', code:string='SWAGGIFY_ERROR') {
    super(message);
    this.name = code;
    Error.captureStackTrace(this, SwaggifyError)
  }
}