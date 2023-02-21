import validator from 'validator';
import Database from './Database.js';

export default class MXpressValidator {
  constructor(rules) {
    this.validator = validator;
    this.rules = rules;
    this.db = Database.getInstance();
  }

  emptyObject(obj) {
    console.log('emptyObject: ', obj);
    return Object.keys(obj).length === 0;
  }

  isNumericOrSingleChar(value) {
    return (
      Number.isInteger(value) ||
      (typeof value === 'number' && !isNaN(value)) ||
      (typeof value === 'string' && value.length === 1)
    );
  }

  async isUnique(collectionName, fieldName, fieldValue) {
    const result = await this.db.connection
      .collection(collectionName)
      .findOne({ [fieldName]: fieldValue });
    return !result;
  }

  async handleRequired(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    if (!Array.isArray(params)) {
      params = [params];
    }
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
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    // params = [true, 'Email format is invalid'];
    // params[0] is the boolean value
    // params[1] is the custom message

    if (!Array.isArray(params)) {
      params = [params];
    }

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
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    // params[0] is an integer value
    // params[1] is the custom message

    if (!Array.isArray(params)) {
      params = [params];
    }

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
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    // params[0] is an integer value
    // params[1] is the custom message

    if (!Array.isArray(params)) {
      params = [params];
    }

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
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    // params[0] is an array
    // params[0][0] is the collection name
    // params[0][1] is the field name
    // params[1] is the custom message

    if (params[0].length === 2) {
      // params[0] is an array of length 2
      const result = this.isUnique(params[0][0], params[0][1], fieldData);

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

  // async handleInBetween(params, fieldData) {
  //   // params = [[0, 100], 'This field must be in between the range'];
  //   // params[0] is an array
  //   // params[0][0] is the minimum value
  //   // params[0][1] is the maximum value
  //   // params[1] is the custom message

  //   if (!Array.isArray(params)) {
  //     // params is not even a 1D array
  //     return 'Something went wrong';
  //   }
  //   // check if params is a 2D array
  //   if (!Array.isArray(params[0])) {
  //     // params is not a 2D array
  //     return 'Something went wrong';
  //   }

  //   if (params[0].length < 2) {
  //     // params[0] is an array of length less than 2
  //     return 'Something went wrong';
  //   }

  //   if (params[0].length === 2) {
  //     // params[0] is an array of length 2
  //     if (
  //       this.validator.isFloat(params[0][0]) &&
  //       this.validator.isFloat(params[0][1])
  //     ) {
  //       // params[0][0] and params[0][1] are floats
  //       if (
  //         this.validator.isFloat(fieldData) &&
  //         fieldData >= params[0][0] &&
  //         fieldData <= params[0][1]
  //       ) {
  //         // fieldData is a float and is in between the range

  //         return {};
  //       } else {
  //         // fieldData is not a float or is not in between the range
  //         return params.length === 2
  //           ? params[1]
  //           : 'This field must be in between the range';
  //       }
  //     } else {
  //       // params[0][0] and params[0][1] are not floats
  //       return 'Something went wrong';
  //     }
  //   } else {
  //     // params[0] is not an array of length 2
  //     return 'Something went wrong';
  //   }
  // }

  async handleInBetween(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    // params should be in the format [[min, max], 'message'] or [min, max] else it will throw an error
    // params[0] is an array
    // params[0][0] is the minimum value
    // params[0][1] is the maximum value
    // params[1] is the custom message

    // the below code will convert the params to the format [[min, max], 'message'] if possible else it will throw an error
    if (
      Array.isArray(params) &&
      params.length === 2 &&
      this.isNumericOrSingleChar(params[0]) &&
      this.isNumericOrSingleChar(params[1]) &&
      typeof params[0] === typeof params[1]
    ) {
      params = [
        params,
        `This field must be in between ${params[0]} and ${params[1]}`,
      ];
    } else if (
      Array.isArray(params) &&
      params.length === 2 &&
      Array.isArray(params[0]) &&
      typeof params[1] === 'string' &&
      params[0].length === 2 &&
      this.isNumericOrSingleChar(params[0][0]) &&
      this.isNumericOrSingleChar(params[0][1]) &&
      typeof params[0][0] === typeof params[0][1]
    ) {
      params = params;
    } else {
      return 'The range format is not correct';
    }

    // so the params is exactly in the format [[min, max], message] now
    // just check the fieldData is in between the range or not

    if (fieldData >= params[0][0] && fieldData <= params[0][1]) {
      // fieldData is in between the range, no error
      return {};
    } else {
      // fieldData is not in between the range
      return params[1];
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
    } else if (attribute === 'between') {
      return await this.handleInBetween(params, fieldData);
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

          // if the error message agaist the filed is empty object, then simply assign it, else push it to the array
          // if (this.emptyObject(errMsg) === false) {
          //   if (errors[field]) {
          //     if (Array.isArray(errors[field])) {
          //       errors[field].push(errMsg);
          //     } else {
          //       errors[field] = [errors[field], errMsg];
          //     }
          //   } else {
          //     errors[field] = errMsg;
          //   }
          // }

          // just assign the error message to the field
          if (this.emptyObject(errMsg) === false) {
            errors[field] = errMsg;
          }
        }
      }
    }
    return errors;
  }
}
