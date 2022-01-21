export class SwaggifyError extends Error {
    constructor(message = "An unexpected error occurred", code = "SWAGGIFY_ERROR") {
        super(message);
        this.name = code;
        Error.captureStackTrace(this, SwaggifyError);
    }
}
