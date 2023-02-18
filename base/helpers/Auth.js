import bcrypt from 'bcrypt';

export default class Auth {
  static async hashPassword(plainTextPassword, saltRounds = 10) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    return hashedPassword;
  }

  static async matchPassword(plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
