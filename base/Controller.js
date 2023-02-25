import Password from './utils/Password.js';

export default class Controller {
  constructor() {}

  // this is a helper function to refactor the json response
  sendApiResponse(res, status, message, data = null) {
    let json = {
      success: parseInt(status / 100) == 2 ? true : false,
      status: status,
      message: message,
    };
    if (data) {
      json.data = data;
    }
    res.status(status).send(json);
  }

  // show all data
  async index(req, res) {
    try {
      let data = await this.Model.find();
      if (!data || data.length == 0) {
        return this.sendApiResponse(res, 404, 'data not found');
      }
      this.sendApiResponse(res, 200, 'successfully fetched', data);
    } catch (err) {
      this.sendApiResponse(res, 500, err);
      console.log(err);
    }
  }

  // show a single data
  async show(req, res) {
    try {
      const id = req.params.id;
      let data = await this.Model.findById(id);
      if (!data) {
        return this.sendApiResponse(res, 404, 'data not found');
      }
      this.sendApiResponse(res, 200, 'successfully fetched', data);
    } catch (err) {
      this.sendApiResponse(res, 500, err);
      console.log(err);
    }
  }

  // store a data
  async store(req, res) {
    let data = new this.Model(req.body);

    // validate first
    // try {
    //   await data.validate();
    // } catch (err) {
    //   this.sendApiResponse(res, 400, errorMessageFormatter(err.message));
    //   return;
    // }

    // fire the query
    try {
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
    } catch (err) {
      this.sendApiResponse(res, 500, err);
    }
  }

  // update a data
  async update(req, res) {
    try {
      const id = req.params.id;
      let data = await this.Model.findById(id);
      if (!data) {
        return this.sendApiResponse(res, 404, 'data not found');
      }
      data.set(req.body);
      await data.save();
      this.sendApiResponse(res, 200, 'updated successfully', data);
    } catch (err) {
      this.sendApiResponse(res, 500, err);
    }
  }

  // delete a data
  async delete(req, res) {
    try {
      const id = req.params.id;
      let data = await this.Model.findByIdAndDelete({ _id: id });
      if (!data) {
        return this.sendApiResponse(res, 404, 'data not found');
      }
      this.sendApiResponse(res, 200, 'deleted successfully');
    } catch (err) {
      this.sendApiResponse(res, 500, err);
    }
  }

  // soft delete a data
  async softDelete(req, res) {
    try {
      const id = req.params.id;
      let data = await this.Model.findById({ _id: id });
      if (!data) {
        return this.sendApiResponse(res, 404, 'data not found');
      }
      data.deletedAt = new Date();
      await data.save();
      this.sendApiResponse(res, 200, 'deleted successfully');
    } catch (err) {
      this.sendApiResponse(res, 500, err);
    }
  }
}
