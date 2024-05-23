import { connection } from '../database/connect';

export class RevokedTokensModel {
  static async addToken(userId: number | string, token: string) {
    return new Promise((resolved, rejected) => {
      try {
        return connection.query(
          'INSERT INTO revoked_tokens(token, user_id) VALUES (?,?)',
          [token, userId],
          (error) => {
            if (error) rejected(error);
            resolved(true);
          }
        );
      } catch (error: any) {
        console.error(error);
      }
    });
  }
  static async findUserTokens(userId: number | string, token: string) {
    try {
      return new Promise((resolved, rejected) => {
        connection.query(
          'SELECT * FROM revoked_tokens WHERE user_id = ? AND token = ?',
          [userId, token],
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
}
