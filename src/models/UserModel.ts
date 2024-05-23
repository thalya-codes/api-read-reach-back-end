import { connection } from '../database/connect';

export class UserModel {
  static async findOne(email: string) {
    try {
      return new Promise((resolved, rejected) => {
        connection.query(
          'SELECT * FROM users WHERE email = ?',
          [email],
          (error, results) => {
            if (error) {
              rejected(error);
              return;
            }
            if (results.length > 0) {
              resolved(results[0]);
            } else {
              resolved(false);
            }
          }
        );
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  static async create({ name, email, password }: any) {
    try {
      return connection.query(
        'INSERT INTO users(name, email, password) VALUES (?,?,?)',
        [name, email, password],
        (error, result) => {
          if (error) throw error;
          return result;
        }
      );
    } catch (error: any) {
      console.error(error);
    }
  }
}
