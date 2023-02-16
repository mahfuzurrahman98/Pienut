import Database from '../Database.js';

export default class Model {
  db = null;

  makeSchema(schema) {
    return new this.db.Schema(schema);
  }

  makeModel(name, schema) {
    return this.db.model(name, schema);
  }

  constructor(name, schema) {
    this.db = Database.getInstance();
    this.Model = this.makeModel(name, this.makeSchema(schema));
    // return db;
  }
}
