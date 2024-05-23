import { Response } from 'express';
import { RevokedTokensModel } from '../models/RevokedTokensModel';
import { SUCCESSFUL_OPERATION } from '../errors';

export class RevokedTokensController {
  static async add({ user_id, token }: any, response: Response) {
    try {
      await RevokedTokensModel.addToken(user_id, token);
      response.status(200).json({ message: SUCCESSFUL_OPERATION });
    } catch (error: any) {
      response
        .status(error.status || 500)
        .json({ message: error.message || error });
    }
  }
}
