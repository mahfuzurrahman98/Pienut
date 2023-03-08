import Database from './Database.js';

export default class Model {
  db = null;
  Model = null;
  softDelete = false;
  hidden = [];

  constructor() {
    this.db = Database.getInstance();
  }

  makeSchema(schema) {
    return new this.db.Schema(schema, { timestamps: true });
  }

  makeModel(name, schema) {
    this.Model = this.db.model(name, this.makeSchema(schema));
  }

  setHiddenAttributes(fields) {
    this.Model.hidden = fields;
  }

  enableSoftDelete(flag) {
    this.Model.softDelete = flag;
  }
}
