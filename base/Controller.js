import Password from './utils/Password.js';

export default class Controller {
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
    let data = await this.Model.find();
    if (!data || data.length == 0) {
      return this.sendApiResponse(res, 404, 'data not found');
    }

    // convert the data to object
    data = data.map((item) => item.toObject());

    // loop through the data and remove the hidden fields
    if (this.Model.hidden) {
      data = data.map((item) => {
        // console.log('item:', item);
        this.Model.hidden.forEach((field) => {
          console.log('hidden fields:', field);
          delete item[field];
        });
        return item;
      });
    }

    this.sendApiResponse(res, 200, 'successfully fetcheddd', data);
  }

  // show a single data
  async _show(req, res) {
    const id = req.params.id;
    let data = await this.Model.findById(id);
    if (!data) {
      return this.sendApiResponse(res, 404, 'data not found');
    }

    // convert the data to object
    data = data.toObject();

    // remove the hidden fields from data object
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

    // fire the query

    if (data.password) {
      // only for user creation
      data.password = await Password.hash(data.password);
    }
    await data.save();
    if (data.password) {
      // only for user creation
      data.password = undefined;
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
    data.set(req.body);
    await data.save();
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
