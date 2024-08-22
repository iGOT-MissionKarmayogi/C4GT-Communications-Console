class AppErrors extends Error {
  constructor(message, statusCode, fields = null) {
    super(message);
    this.statusCode = statusCode;
    this.fields = fields;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = false;
    Error.captureStackTrace(this, this.constructor);
  }
}

exports.AppErrors = AppErrors;
