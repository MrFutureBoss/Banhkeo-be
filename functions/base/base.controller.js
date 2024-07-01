import { ManagedError } from '../model/error.model.js';
import { ResponsePayload } from '../model/response.model.js';
import BaseClass from './base.class.js';

class BaseController extends BaseClass {
  defaultSuccessMsg = 'Request success.';
  defaultFailMsg = 'Request fails.';
  name;

  constructor(name) {
    super();
    this.name = name;
  }

  success(req, res) {
    return (data, message) => {
      const finalMessage = message || this.defaultSuccessMsg;
      const finalData = data ? { ...data } : {};
      const responsePayload = new ResponsePayload(200, finalMessage, finalData);
      res.status(200).send(responsePayload);
    };
  }

  fail(req, res) {
    return (data, message) => {
      const finalMessage = message || this.defaultFailMsg;
      const finalData = data ? { data } : { data: null };
      const responsePayload = new ResponsePayload(500, finalMessage, finalData);
      res.status(500).send(responsePayload);
    };
  }

  paginate(req, res) {
    return (data, pagination, statusId, message) => {
      const finalMessage = message || this.defaultSuccessMsg;
      const finalData = {
        data: { list: data, pagination, statusId },
      };
      const responsePayload = new ResponsePayload(200, finalMessage, finalData);
      res.status(200).send(responsePayload);
    };
  }

  getManagedError(error) {
    console.log(new ManagedError(this.name, error));
    return new ManagedError(this.name, error);
  }
}

export default BaseController;
