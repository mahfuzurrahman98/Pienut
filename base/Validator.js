import validator from 'validator';
import Database from './Database.js';

export default class MXpressValidator {
  constructor(rules) {
    this.validator = validator;
    this.rules = rules;
    this.db = Database.getInstance();
  }

  emptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  async isUnique(collectionName, fieldName, fieldValue) {
    const result = this.db.connection
      .collection(collectionName)
      .findOne({ [fieldName]: fieldValue });
    return !result;
  }

  async handleRequired(params, fieldData) {
    // params[0] is the boolean value
    // params[1] is the custom message

    if (params[0] === true) {
      // field data msut be present
      if (!fieldData) {
        // field data is not present, throw error
        return params.length === 2 ? params[1] : 'This field is mandatory';
      } else {
        // field data is present, return no error
        return {};
      }
    } else if (params[0] === false) {
      // field data is not mandatory, no matter if it is present or not
      return {};
    } else {
      // params[0] is not boolean
      return 'Something went wrong';
    }
  }

  async handleIsEmail(params, fieldData) {
    // params[0] is the boolean value
    // params[1] is the custom message

    if (params[0] === true) {
      // field data msut be present
      if (!this.validator.isEmail(fieldData)) {
        // field data is not present, throw error
        return params.length === 2 ? params[1] : 'Email format is invalid';
      } else {
        // field data is present, return no error
        return {};
      }
    } else if (params[0] === false) {
      // field data is not mandatory, no matter if it is present or not
      return {};
    } else {
      // params[0] is not boolean
      return 'Something went wrong';
    }
  }

  async handleMin(params, fieldData) {
    // params[0] is an integer value
    // params[1] is the custom message

    if (this.validator.isInt(params[0])) {
      // the length msut be an integer
      if (fieldData.length < params[0]) {
        // the length is less than the minimum length, throw error
        return params.length === 2 ? params[1] : 'This field is too short';
      } else {
        // the length is greater or equal to the minimum length, return no error
        return {};
      }
    } else {
      // params[0] is not integer
      return 'Something went wrong';
    }
  }

  async handleMax(params, fieldData) {
    // params[0] is an integer value
    // params[1] is the custom message

    if (this.validator.isInt(params[0])) {
      // the length msut be an integer
      if (fieldData.length > params[0]) {
        // the length is greater than the maximum length, throw error
        return params.length === 2 ? params[1] : 'This field is too long';
      } else {
        // the length is less or equal to the maximum length, return no error
        return {};
      }
    } else {
      // params[0] is not integer
      return 'Something went wrong';
    }
  }

  async handleIsUnique(params, fieldData) {
    // params[0] is an array
    // params[0][0] is the collection name
    // params[0][1] is the field name
    // params[1] is the custom message

    if (params[0].length === 2) {
      // params[0] is an array of length 2
      const result = await this.isUnique(params[0][0], params[0][1], fieldData);
      if (result) {
        // the field data is unique
        return {};
      } else {
        // the field data is not unique
        return params.length === 2 ? params[1] : 'This field must be unique';
      }
    } else {
      // params[0] is not an array of length 2
      return 'Something went wrong';
    }
  }

  // make a function to handle a value is in between a range, the range is an array of two numbers that can be integers or floats negative or positive

  async handleInBetween(params, fieldData) {
    // params[0] is an array
    // params[0][0] is the minimum value
    // params[0][1] is the maximum value
    // params[1] is the custom message

    if (params[0].length === 2) {
      // params[0] is an array of length 2
      if (
        this.validator.isFloat(params[0][0]) &&
        this.validator.isFloat(params[0][1])
      ) {
        // params[0][0] and params[0][1] are floats
        if (
          this.validator.isFloat(fieldData) &&
          fieldData >= params[0][0] &&
          fieldData <= params[0][1]
        ) {
          // fieldData is a float and is in between the range

          return {};
        } else {
          // fieldData is not a float or is not in between the range
          return params.length === 2
            ? params[1]
            : 'This field must be in between the range';
        }
      } else {
        // params[0][0] and params[0][1] are not floats
        return 'Something went wrong';
      }
    } else {
      // params[0] is not an array of length 2
      return 'Something went wrong';
    }
  }

  async handleAttributeValidation(attribute, params, fieldData) {
    // console.log(`${attribute} | ${params} | ${fieldData}`);
    if (attribute === 'required') {
      return await this.handleRequired(params, fieldData);
    } else if (attribute === 'isEmail') {
      return await this.handleIsEmail(params, fieldData);
    } else if (attribute === 'min') {
      return await this.handleMin(params, fieldData);
    } else if (attribute === 'max') {
      return await this.handleMax(params, fieldData);
    } else if (attribute === 'isUnique') {
      return await this.handleIsUnique(params, fieldData);
    } else {
    }
  }

  async run(data) {
    let errors = {};

    for (let field in this.rules) {
      // populate the constraints against the field
      const constraints = this.rules[field];
      if (this.emptyObject(constraints)) {
        // if constraints is empty object, nothing to do
        return;
      }
      for (let attribute in constraints) {
        // populate the [value, message] against the attribute
        if (constraints[attribute].length === 0) {
          // this attribute has no value and message to validate
          errors['default'] = 'Something went wrong';
        } else {
          // lets check the attribute and validate
          const errMsg = await this.handleAttributeValidation(
            attribute,
            constraints[attribute],
            data[field]
          );

          if (this.emptyObject(errMsg) === false) {
            if (errors[field]) {
              if (Array.isArray(errors[field])) {
                errors[field].push(errMsg);
              } else {
                errors[field] = [errors[field], errMsg];
              }
            } else {
              errors[field] = errMsg;
            }
          }
        }
      }
    }
    return errors;
  }
}
