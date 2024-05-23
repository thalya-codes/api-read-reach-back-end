import { connection } from '../database/connect';
import { IReading } from '../interfaces/IReading';

export class ReadingsModel {
  static async create({
    title,
    start_date,
    end_date,
    rating,
    user_id,
  }: IReading) {
    try {
      return new Promise((resolved, rejected) => {
        connection.query(
          'INSERT INTO readings (title, start_date, end_date, rating, user_id) VALUES (?, ?, ?, ?, ?)',
          [title, start_date, end_date, rating, user_id],
          (error) => {
            if (error) {
              rejected(error);
              return;
            } else {
              resolved(true);
              return;
            }
          }
        );
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  static async findAll(userId: number | string) {
    try {
      return new Promise((resolved, rejected) => {
        connection.query(
          'SELECT * FROM readings WHERE user_id = ?',
          [userId],
          (error, results) => {
            if (error) {
              rejected(error);
              return;
            }
            if (results.length > 0) {
              resolved(results);
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

  static async deleteOne(userId: number | string, readingId: number | string) {
    try {
      return new Promise((resolved, rejected) => {
        connection.query(
          'DELETE FROM readings WHERE user_id = ? AND id = ?',
          [userId, readingId],
          (error) => {
            if (error) {
              rejected(error);
              return;
            } else {
              resolved(true);
            }
          }
        );
      });
    } catch (error: any) {
      console.error(error);
    }
  }
}
