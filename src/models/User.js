import Model from "../../base/Model.js";

class User extends Model {
  collectionName = 'users';

  schemaObj = { // simply write your schema rules here
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'viewer'],
      default: 'viewer'
    },
    active: {
      type: Boolean,
      default: true
    },
    deletedAt: {
      type: Date,
      default: null
    },
  }

  constructor() {
    super();
    this.makeModel(this.collectionName, this.schemaObj);
    return this.Model;
  }
}

export default new User();
