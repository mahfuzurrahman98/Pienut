import Model from '../../base/index.js';

class Item extends Model {
  collectionName = 'items';

  schemaObj = {
    name: {
      type: String,
      required: true,
    },
    catName: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: true,
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
    this.setHiddenAttributes(['deletedAt']);

    return this.Model;
  }
}

export default new Item();
