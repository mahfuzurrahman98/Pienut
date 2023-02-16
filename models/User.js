import Model from "../base/Model.js";

// const schemaObj = { // simply write your schemaObj here
//   name: String,
//   username: String,
//   userType: Number,
// };

class User extends Model {
  collectionName = 'users';

  schemaObj = { // simply write your schema rules here
    name: String,
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
