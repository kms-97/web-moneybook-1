class CustomError extends Error {
  constructor({ statusCode, errorCode, name, message }) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.name = name;
  }

  toObject() {
    return {
      errorCode: this.errorCode,
      name: this.name,
      message: this.message,
    };
  }
}

module.exports = CustomError;
