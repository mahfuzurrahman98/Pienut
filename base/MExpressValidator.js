class MExpressValidator {
  constructor() {}

  async isUnique(collectionName, fieldName, value) {
    console.log('val: ', value);
    const result = await this.db.connection.db
      .collection(collectionName)
      .findOne({ [fieldName]: value });
    console.log('result: ', result);
    return !result;
  }
}
