import Database from './Database.js';

export default class Model {
  db = null;
  Model = null;

  constructor() {
    this.db = Database.getInstance();
  }

  makeSchema(schema) {
    return new this.db.Schema(schema);
  }

  makeModel(name, schema) {
    this.Model = this.db.model(name, this.makeSchema(schema));
  }
}
