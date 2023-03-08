import Password from './utils/Password.js';
import Validator from './Validator.js';

export default class Controller {
  updateValidationRules = {};
  storeValidationRules = {};

  constructor() {}

  // this is a helper function to refactor the json response
  sendApiResponse(res, status, message, data = null) {
    let json = {
      success: parseInt(status / 100) == 2,
      status: status,
      message: message,
    };
    if (data) {
      json.data = data;
    }
    res.status(status).send(json);
  }

  // show all data
  async _index(req, res) {
    let data = await this.Model.find({ deletedAt: null });

    if (!data || data.length == 0) {
      return this.sendApiResponse(res, 404, 'data not found');
    }

    data = data.map((item) => item.toObject());
    if (this.Model.hidden) {
      data = data.map((item) => {
        this.Model.hidden.forEach((field) => {
          console.log('hidden fields:', field);
          delete item[field];
        });
        return item;
      });
    }

    this.sendApiResponse(res, 200, 'successfully fetched', data);
  }

  // show a single data
  async _show(req, res) {
    const id = req.params.id;
    let data = await this.Model.findOne({ _id: id, deletedAt: null });

    if (!data) {
      return this.sendApiResponse(res, 404, 'data not found');
    }

    data = data.toObject();
    if (this.Model.hidden) {
      this.Model.hidden.forEach((field) => {
        delete data[field];
      });
    }

    this.sendApiResponse(res, 200, 'successfully fetched', data);
  }

  // store a data
  async _store(req, res) {
    let data = new this.Model(req.body);

    if (Object.keys(this.storeValidationRules).length > 0) {
      const validator = new Validator(this.storeValidationRules);
      await validator.run(req.body);

      if (validator.fails()) {
        this.sendApiResponse(res, 400, validator.errors());
        return;
      }
    }

    if (data.password) {
      // only for user creation
      data.password = await Password.hash(data.password);
    }

    await data.save();

    data = data.toObject();
    if (this.Model.hidden) {
      this.Model.hidden.forEach((field) => {
        delete data[field];
      });
    }

    this.sendApiResponse(res, 201, 'created successfully', data);
  }

  // update a data
  async _update(req, res) {
    const id = req.params.id;
    let data = await this.Model.findById(id);

    if (!data) {
      return this.sendApiResponse(res, 404, 'data not found');
    }

    if (Object.keys(this.updateValidationRules).length > 0) {
      const validator = new Validator(this.updateValidationRules);
      await validator.run(req.body);
      if (validator.fails()) {
        this.sendApiResponse(res, 400, validator.errors());
        return;
      }
    }

    data.set(req.body);
    await data.save();

    data = data.toObject();
    if (this.Model.hidden) {
      this.Model.hidden.forEach((field) => {
        delete data[field];
      });
    }

    this.sendApiResponse(res, 200, 'updated successfully', data);
  }

  // delete a data
  async _destroy(req, res) {
    const id = req.params.id;

    let data = await this.Model.findById({ _id: id });
    if (!data) {
      return this.sendApiResponse(res, 404, 'data not found');
    }

    if (this.Model.softDelete) {
      data.deletedAt = new Date();
      await data.save();
    } else {
      data.delete();
    }

    this.sendApiResponse(res, 200, 'deleted successfully');
  }
}
