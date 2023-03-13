import Model from '../Model.js';

class RefreshToken extends Model {
  collectionName = 'refresh_tokens';

  schemaObj = {
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    userId: {
      type: this.db.Schema.Types.ObjectId,
      required: true,
    },
  };

  constructor() {
    super();
    this.makeModel(this.collectionName, this.schemaObj);

    return this.Model;
  }
}

export default new RefreshToken();
