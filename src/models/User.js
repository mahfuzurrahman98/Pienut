import Model from '../../base/Model.js';

class User extends Model {
  collectionName = 'u_users';

  // schemaObj = {
  //   name: {
  //     type: String,
  //     required: [true, 'Name is required'],
  //   },
  //   username: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //     validate: {
  //       validator: (value) =>
  //         this.isUnique(this.collectionName, 'username', value),
  //       message: 'Username is already taken',
  //     },
  //   },
  //   email: {
  //     type: String,
  //     required: true,
  //     validate: [validator.isEmail, 'Email format is invalid'],
  //     validate: {
  //       validator: (value) =>
  //         this.isUnique(this.collectionName, 'email', value),
  //       message: 'Email is already taken',
  //     },
  //   },
  //   password: {
  //     type: String,
  //     required: [true, 'Password is required'],
  //     minlength: [6, 'Password must be at least 6 characters long'],
  //   },
  //   role: {
  //     type: String,
  //     enum: ['admin', 'moderator', 'viewer'],
  //     default: 'viewer',
  //   },
  //   active: {
  //     type: Boolean,
  //     default: true,
  //   },
  //   deletedAt: {
  //     type: Date,
  //     default: null,
  //   },
  // };

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
    return this.Model;
  }
}

export default new User();
