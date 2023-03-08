import Model from '../../base/Model.js';

class Test extends Model {
  collectionName = 'tests';

  schemaObj = {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
  };

  constructor() {
    super();
    this.makeModel(this.collectionName, this.schemaObj);
    this.softDelete = false;
    return this.Model;
  }
}

export default new Test();
