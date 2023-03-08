import { Controller } from '../../base/index.js';
import Item from '../models/Item.js';

class ItemController extends Controller {
  constructor() {
    super();
    this.Model = Item;

    this.storeValidationRules = {
      name: {
        string: true,
        required: true,
        unique: [['items', 'name'], 'Item name is already taken'],
      },
      catName: {
        string: true,
      },
      price: {
        number: true,
        required: true,
      },
    };
  }
}

export default new ItemController();
