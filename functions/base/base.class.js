import autoBind from 'auto-bind';

export default class BaseClass {
  constructor() {
    autoBind(this);
  }
}
