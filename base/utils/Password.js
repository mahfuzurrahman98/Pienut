import bcrypt from 'bcrypt';

export default class Password {
  static async hash(plainTextPassword, saltRounds = 10) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    return hashedPassword;
  }

  static async match(plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
