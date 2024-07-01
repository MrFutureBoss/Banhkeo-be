class ResponsePayload {
  constructor(code, message, result = null) {
    this.code = code;
    this.message = message;
    this.result = result;
  }
}

export { ResponsePayload };
