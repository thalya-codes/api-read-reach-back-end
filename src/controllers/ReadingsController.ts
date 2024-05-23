import { Request, Response } from 'express';
import { ReadingsModel } from '../models/ReadingsModel';
import {
  HttpError,
  REQUIRED_READING_FIELDS_NOT_FILLED,
  SUCCESSFUL_OPERATION,
} from '../errors';

export class ReadingsController {
  static async createNewReading({ body }: Request, response: Response) {
    const { title, start_date, end_date, rating, user_id } = body;

    try {
      if (!title || !start_date || !end_date || !rating || !user_id)
        throw new HttpError(REQUIRED_READING_FIELDS_NOT_FILLED, 400);
      await ReadingsModel.create(body);
      response.json({ status: 201, message: SUCCESSFUL_OPERATION });
    } catch (error: any) {
      response
        .status(error.status || 500)
        .json({ message: error.message || error });
    }
  }
  static async findAll({ params: { userId } }: any, response: Response) {
    try {
      const userReadings = await ReadingsModel.findAll(userId);
      response
        .status(200)
        .json({ message: SUCCESSFUL_OPERATION, readings: userReadings });
    } catch (error: any) {
      response
        .status(error.status || 500)
        .json({ message: error?.message || error });
    }
  }

  static async deleteOne({ params: { id, userId } }: any, response: Response) {
    try {
      await ReadingsModel.deleteOne(userId, id!);
      response.status(204).json({ message: SUCCESSFUL_OPERATION });
    } catch (error: any) {
      response
        .status(error.status || 500)
        .json({ message: error?.message || error });
    }
  }
}
