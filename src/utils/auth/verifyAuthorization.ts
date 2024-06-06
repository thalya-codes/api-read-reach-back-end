import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './verifyToken';
import { HttpError, NOT_AUTHORIZATED } from '../../errors';
import { RevokedTokensModel } from '../../models/RevokedTokensModel';
import { IUser } from '../../interfaces';

export const verifyAuthorization = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;
  if (!token) {
    response.status(401).json({ message: NOT_AUTHORIZATED, status: 401 });
    throw new HttpError(NOT_AUTHORIZATED, 401);
  }

  try {
    const decodedInfos = verifyToken({ token, response });

    if (!decodedInfos) {
      response.status(401).json({ message: NOT_AUTHORIZATED, status: 401 });
      throw new HttpError(NOT_AUTHORIZATED, 401);
    }

    const {
      payload: { id },
    } = decodedInfos as any;

    const providedTokenWasRevoked = (await RevokedTokensModel.findUserTokens(
      id,
      token
    )) as IUser;

    if (!providedTokenWasRevoked) {
      next();
      return;
    }

    response.status(401).json({ message: NOT_AUTHORIZATED, status: 401 });
    throw new HttpError(NOT_AUTHORIZATED, 401);
  } catch (error) {
    response.status(401).json({ message: NOT_AUTHORIZATED, status: 401 });
  }
};
