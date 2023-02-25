import Database from './Database.js';

export default class Validator {
  constructor(rules) {
    this.errorMessages = {};
    this.rules = rules;
    this.db = Database.getInstance();
  }

  emptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

  fails() {
    return !this.emptyObject(this.errorMessages);
  }

  errors() {
    return this.errorMessages;
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
    if (!Array.isArray(params)) {
      params = [params];
    }
    // params[0] is the boolean value
    // params[1] is the custom message

    if (params[0] === true) {
      // field data msut be present
      if (!fieldData) {
        // field data is not present, throw error
        return params.length === 2 && params[1].trim() != ''
          ? params[1]
          : 'This field is mandatory';
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

    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (params[0] === true) {
      // field data msut be an email
      if (fieldData.match(regex) == null) {
        // field data is not an email, throw error
        return params.length === 2 && params[1].trim() != ''
          ? params[1]
          : 'Email format is invalid';
      } else {
        // field data is an email, return no error
        return {};
      }
    } else if (params[0] === false) {
      // field data is not need to be an email, no matter if it is an email or not
      return {};
    } else {
      // params[0] is not boolean
      return 'Something went wrong';
    }
  }

  async handleIsMax(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    // params[0] is either an integer, or a float, or a single character
    // params[1] is the custom message

    if (!Array.isArray(params)) {
      params = [params];
    }

    if (this.isNumericOrSingleChar(params[0])) {
      // the maximum value msut be an integer or a float or a single character
      if (fieldData > params[0]) {
        // the value is greater than the maximum value, throw error
        return params.length === 2 && params[1].trim() != ''
          ? params[1]
          : 'This field value is too large';
      } else {
        // the value is less or equal to the maximum value, return no error
        return {};
      }
    } else {
      // params[0] is not integer or float or single character
      return 'Something went wrong';
    }
  }

  async handleIsMin(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    // params[0] is either an integer, or a float, or a single character
    // params[1] is the custom message

    if (!Array.isArray(params)) {
      params = [params];
    }

    if (this.isNumericOrSingleChar(params[0])) {
      // the minimum value msut be an integer or a float or a single character
      if (fieldData < params[0]) {
        // the value is less than the minimum value, throw error
        return params.length === 2 && params[1].trim() != ''
          ? params[1]
          : 'This field value is too small';
      } else {
        // the value is greater or equal to the minimum value, return no error
        return {};
      }
    } else {
      // params[0] is not integer or float or single character
      return 'Something went wrong';
    }
  }

  async handleMinLength(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    // params[0] is an integer value
    // params[1] is the custom message

    if (!Array.isArray(params)) {
      params = [params];
    }

    if (Number.isInteger(params[0])) {
      // the length msut be an integer
      if (fieldData.length < params[0]) {
        // the length is less than the minimum length, throw error
        return params.length === 2 && params[1].trim() != ''
          ? params[1]
          : 'This field is too short';
      } else {
        // the length is greater or equal to the minimum length, return no error
        return {};
      }
    } else {
      // params[0] is not integer
      return 'Something went wrong';
    }
  }

  async handleMaxLength(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    // params[0] is an integer value
    // params[1] is the custom message

    if (!Array.isArray(params)) {
      params = [params];
    }

    if (Number.isInteger(params[0])) {
      // the length msut be an integer
      if (fieldData.length > params[0]) {
        // the length is greater than the maximum length, throw error
        return params.length === 2 && params[1].trim() != ''
          ? params[1]
          : 'This field is too long';
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
      const result = await this.isUnique(params[0][0], params[0][1], fieldData);
      if (result) {
        // the field data is unique
        return {};
      } else {
        // the field data is not unique
        return params.length === 2 && params[1].trim() != ''
          ? params[1]
          : 'This field must be unique';
      }
    } else {
      // params[0] is not an array of length 2
      return 'Something went wrong';
    }
  }

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
      return params[1].trim() != ''
        ? params[1]
        : `This field must be in between ${params[0][0]} and ${params[0][1]}`;
    }
  }

  async handleIsNumber(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    if (!Array.isArray(params)) {
      params = [params];
    }

    if (!isNaN(fieldData) && isFinite(fieldData)) {
      // fieldData is a number, no error
      return {};
    } else {
      // fieldData is not a number
      return params.length === 2 && params[1].trim() != ''
        ? params[1]
        : 'This field must be a number';
    }
  }

  async handleIsFloat(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    if (!Array.isArray(params)) {
      params = [params];
    }

    if (
      Number(fieldData) === fieldData &&
      fieldData % 1 !== 0 &&
      typeof fieldData === 'number'
    ) {
      // fieldData is a float, no error
      return {};
    } else {
      // fieldData is not a float
      return params.length === 2 && params[1].trim() != ''
        ? params[1]
        : 'This field must be a float';
    }
  }

  async handleIsInteger(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    if (!Array.isArray(params)) {
      params = [params];
    }

    if (Number.isInteger(fieldData)) {
      // fieldData is an integer, no error
      return {};
    } else {
      // fieldData is not an integer
      return params.length === 2 && params[1].trim() != ''
        ? params[1]
        : 'This field must be an integer';
    }
  }

  async handleIsBoolean(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    if (!Array.isArray(params)) {
      params = [params];
    }

    if (typeof fieldData === 'boolean') {
      // fieldData is a boolean, no error
      return {};
    } else {
      // fieldData is not a boolean
      return params.length === 2 && params[1].trim() != ''
        ? params[1]
        : 'This field must be a boolean';
    }
  }

  async handleIsString(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    if (!Array.isArray(params)) {
      params = [params];
    }

    if (typeof fieldData === 'string') {
      // fieldData is a string, no error
      return {};
    } else {
      // fieldData is not a string
      return params.length === 2 && params[1].trim() != ''
        ? params[1]
        : 'This field must be a string';
    }
  }

  async handleIsCharacter(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    if (!Array.isArray(params)) {
      params = [params];
    }

    if (typeof fieldData === 'string' && fieldData.length === 1) {
      // fieldData is a char, no error
      return {};
    } else {
      // fieldData is not a char
      return params.length === 2 && params[1].trim() != ''
        ? params[1]
        : 'This field must be a char';
    }
  }

  async handleIsAlpha(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    if (!Array.isArray(params)) {
      params = [params];
    }

    if (typeof fieldData === 'string' && fieldData.match(/^[a-zA-Z]+$/)) {
      // fieldData is a string of alphabets, no error
      return {};
    } else {
      // fieldData is not a string of alphabets
      return params.length === 2 && params[1].trim() != ''
        ? params[1]
        : 'This field must be a string of alphabets';
    }
  }

  async handleIsNeumeric(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    if (!Array.isArray(params)) {
      params = [params];
    }

    if (!isNaN(parseFloat(fieldData))) {
      // fieldData is a string of numbers, no error
      return {};
    } else {
      // fieldData is not a string of numbers
      return params.length === 2 && params[1].trim() != ''
        ? params[1]
        : 'This field must be a string of numbers';
    }
  }

  async handleIsAlphanumeric(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    if (!Array.isArray(params)) {
      params = [params];
    }

    if (typeof fieldData === 'string' && fieldData.match(/^[a-zA-Z0-9]+$/)) {
      // fieldData is a string of alphabets and numbers, no error
      return {};
    } else {
      // fieldData is not a string of alphabets and numbers
      return params.length === 2 && params[1].trim() != ''
        ? params[1]
        : 'This field must be a string of alphabets and numbers';
    }
  }

  async handleIsIn(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    if (
      Array.isArray(params) &&
      Array.isArray(params[0]) &&
      typeof params[1] === 'string'
    ) {
      // params has both array and message
      params = params;
    } else if (Array.isArray(params)) {
      // params has only array
      params = [params[0], 'This field value is not expected'];
    } else {
      // params is not an array
      return 'Invalid parameters';
    }

    if (params[0].includes(fieldData)) {
      // fieldData is in the array, no error
      return {};
    } else {
      // fieldData is not in the array
      return params[1].trim() != ''
        ? params[1]
        : 'This field value is not expected';
    }
  }

  async handleIsNotIn(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    if (
      Array.isArray(params) &&
      Array.isArray(params[0]) &&
      typeof params[1] === 'string'
    ) {
      // params has both array and message
      params = params;
    } else if (Array.isArray(params)) {
      // params has only array
      params = [params[0], 'This field value is not expected'];
    } else {
      // params is not an array
      return 'Invalid parameters';
    }

    if (!params[0].includes(fieldData)) {
      // fieldData is not in the array, no error
      return {};
    } else {
      // fieldData is not in the array
      return params[1].trim() != ''
        ? params[1]
        : 'This field value is not expected';
    }
  }

  async handleIsRegex(params, fieldData) {
    if (!fieldData) {
      // fieldData isn't present, throw error
      return 'This field is mandatory';
    }

    if (!Array.isArray(params)) {
      params = [params];
    }

    // params is an array
    // params[0] is the regex
    // params[1] is the error message

    let regex = new RegExp(params[0]);
    if (typeof fieldData === 'string' && fieldData.match(regex)) {
      // fieldData matches the regex, no error
      return {};
    } else {
      // fieldData does not match the regex
      return params.length == 2 && params[1].trim() != ''
        ? params[1]
        : 'This field value is not expected';
    }
  }

  async handleAttributeValidation(attribute, params, fieldData) {
    // console.log(`${attribute} | ${params} | ${fieldData}`);

    if (attribute === 'required') {
      return await this.handleRequired(params, fieldData);
    } else if (attribute === 'email') {
      return await this.handleIsEmail(params, fieldData);
    } else if (attribute === 'min') {
      return await this.handleMin(params, fieldData);
    } else if (attribute === 'max') {
      return await this.handleMax(params, fieldData);
    } else if (attribute === 'min_len') {
      return await this.handleMinLength(params, fieldData);
    } else if (attribute === 'max_len') {
      return await this.handleMaxLength(params, fieldData);
    } else if (attribute === 'between') {
      return await this.handleInBetween(params, fieldData);
    } else if (attribute === 'unique') {
      return await this.handleIsUnique(params, fieldData);
    } else if (attribute === 'number') {
      return await this.handleIsNumber(params, fieldData);
    } else if (attribute === 'float') {
      return await this.handleIsFloat(params, fieldData);
    } else if (attribute === 'int') {
      return await this.handleIsInteger(params, fieldData);
    } else if (attribute === 'bool') {
      return await this.handleIsBoolean(params, fieldData);
    } else if (attribute === 'char') {
      return await this.handleIsCharacter(params, fieldData);
    } else if (attribute === 'numeric') {
      return await this.handleIsNeumeric(params, fieldData);
    } else if (attribute === 'string') {
      return await this.handleIsString(params, fieldData);
    } else if (attribute === 'date') {
      return await this.handleIsDate(params, fieldData);
    } else if (attribute === 'alpha') {
      return await this.handleIsAlpha(params, fieldData);
    } else if (attribute === 'alphanumeric') {
      return await this.handleIsAlphanumeric(params, fieldData);
    } else if (attribute === 'in') {
      return await this.handleIsIn(params, fieldData);
    } else if (attribute === 'not_in') {
      return await this.handleIsNotIn(params, fieldData);
    } else if (attribute === 'regex') {
      return await this.handleIsRegex(params, fieldData);
    } else {
      throw new Error('Invalid attribute');
    }
  }

  async run(data) {
    // let this.errorMessages = {};

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
          this.errorMessages['default'] = 'Something went wrong';
        } else {
          // lets check the attribute and validate
          try {
            const errMsg = await this.handleAttributeValidation(
              attribute,
              constraints[attribute],
              data[field]
            );

            // just assign the error message to the field
            if (this.emptyObject(errMsg) === false) {
              // if (this.errorMessages[field]) already exists, dont overwrite it
              if (!this.errorMessages[field]) {
                this.errorMessages[field] = errMsg;
              }
            }
          } catch (error) {
            process.exit(1);
          }
        }
      }
    }
  }
}
