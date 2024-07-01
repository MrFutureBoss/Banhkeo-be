import { CODE_COMMON_FAILED } from '../constants/global.const.js';

class AppError extends Error {
  constructor(message, code = 500, baCode = CODE_COMMON_FAILED) {
    super();
    this.code = code;
    this.message = message;
    this.baCode = baCode;
  }
}

class ManagedError {
  constructor(origin, error) {
    this.origin = origin;
    this.error = error;
  }
}

export { AppError, ManagedError };
