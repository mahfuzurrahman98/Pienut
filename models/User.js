import Model from "../base/Model.js";

const schema = { // simply write your schema here
  name: String,
  username: String,
  userType: Number,
};

class User extends Model {

  constructor() {
    super('users', schema);
    return this.Model;
  }

}

export default new User();
