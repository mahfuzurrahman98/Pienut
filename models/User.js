import Model from "../base/Model.js";

class User extends Model {
  collectionName = 'users';

  schemaObj = { // simply write your schema rules here
    name: String,
    email: {
      type: String,
      required: true,
    },
    username: String,
    userType: Number,
  };

  constructor() {
    super();
    this.makeModel(this.collectionName, this.schemaObj);
    return this.Model;
  }
}

export default new User();
