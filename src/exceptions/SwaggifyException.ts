function SwaggifyException
  (message: string = 'An unexpected error occurred', code: string = 'SWAGGIFY_EXCEPTION'): Error {
  
    const error: Error = new Error(message);
    error.name = code;
    return error;
  }
  
  SwaggifyException.prototype = Object.create(Error.prototype);


export {SwaggifyException};

