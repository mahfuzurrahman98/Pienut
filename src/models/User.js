import { Model } from '../../base/index.js';

class User extends Model {
  collectionName = 'users';

  schemaObj = {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
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
    role: {
      type: String,
      enum: ['admin', 'moderator', 'viewer'],
      default: 'viewer',
    },
    active: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  };

  constructor() {
    super();
    this.makeModel(this.collectionName, this.schemaObj);
    this.enableSoftDelete(true);
    this.setHiddenAttributes(['password', 'deletedAt']);

    return this.Model;
  }
}

export default new User();
