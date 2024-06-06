import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { ReadingsModel } from '../models/ReadingsModel';
import {
  HttpError,
  NOT_AUTHORIZATED,
  REQUIRED_READING_FIELDS_NOT_FILLED,
  SUCCESSFUL_OPERATION,
} from '../errors';

export class ReadingsController {
  static async createNewReading(
    { body, headers }: Request,
    response: Response
  ) {
    const decoded: any = JWT.decode(headers.authorization || '');
    if (!decoded) return;

    const user_id = decoded.payload.id;
    const { title, author, start_date, end_date, rating } = body;

    try {
      if (!title || !author || !start_date || !end_date || !rating || !user_id)
        throw new HttpError(REQUIRED_READING_FIELDS_NOT_FILLED, 400);

      await ReadingsModel.create({
        title,
        author,
        start_date,
        end_date,
        rating,
        user_id,
      });
      response.json({ status: 201, message: SUCCESSFUL_OPERATION });
    } catch (error: any) {
      response.status(error.status || 500).json(error);
    }
  }
  static async findAll({ headers }: any, response: Response) {
    const token = headers.authorization;

    try {
      const decoded: any = JWT.decode(token);

      if (!decoded) {
        response.status(401).json({ message: NOT_AUTHORIZATED, status: 401 });
        throw new HttpError(NOT_AUTHORIZATED, 401);
      }

      const userReadings = await ReadingsModel.findAll(decoded.payload.id);
      response
        .status(200)
        .json({ message: SUCCESSFUL_OPERATION, readings: userReadings || [] });
    } catch (error: any) {
      response.status(error.status || 500).json(error);
    }
  }

  static async deleteOne({ params: { id }, headers }: any, response: Response) {
    try {
      const token = headers.authorization;

      const decoded: any = JWT.decode(token);

      if (!decoded) {
        response.status(401).json({ message: NOT_AUTHORIZATED, status: 401 });
        throw new HttpError(NOT_AUTHORIZATED, 401);
      }

      await ReadingsModel.deleteOne(decoded.payload.id, id!);
      response.status(204).json({ message: SUCCESSFUL_OPERATION });
    } catch (error: any) {
      response.status(error.status || 500).json(error);
    }
  }
}
