export default class Controller {
  constructor() { }

  // this is a helper function to refactor the json response
  apiResponse(res, status, message, data = null) {
    let json = {
      success: status / 100 === 2 ? true : false,
      status: status,
      message: message
    };
    if (data) {
      json.data = data
    }

    res.status(status)
      .send(json);
  }

  // show all data
  async index(req, res) {
    try {
      let data = await this.Model.find();
      this.apiResponse(res, 200, 'successfully fetched', data);
    } catch (err) {
      this.apiResponse(res, 500, err);
      console.log(err);
    }
  }

  // show a single data
  async show(req, res) {
    try {
      const id = req.params.id;
      let data = await this.Model.find({ _id: id });
      this.apiResponse(res, 200, 'successfully fetched', data);
    } catch (err) {
      this.apiResponse(res, 500, err);
      console.log(err);
    }
  }

  // store a data
  async store(req, res) {
    try {
      let data = new this.Model(req.body);
      await data.save();
      this.apiResponse(res, 201, 'created successfully', data);
    } catch (err) {
      this.apiResponse(res, 500, err);
    }
  }

  // update a data
  async update(req, res) {
    try {
      const id = req.params.id;
      const data = await this.Model.findById(id);

      if (!data) {
        return this.apiResponse(res, 404, 'document not found');
      }

      data.set(req.body);
      await data.save();
      this.apiResponse(res, 200, 'updated successfully', data);
    } catch (err) {
      this.apiResponse(res, 500, err);
    }
  }

  // delete a data
  async delete(req, res) {
    try {
      const id = req.params.id;
      const data = await this.Model.findByIdAndDelete({ _id: id });
      if (!data) {
        return this.apiResponse(res, 404, 'data not found');
      }
      this.apiResponse(res, 200, 'deleted successfully', data);
    } catch (err) {
      this.apiResponse(res, 500, err);
    }
  }

}