import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './verifyToken';
import { NOT_AUTHORIZATED } from '../../errors';
import { RevokedTokensModel } from '../../models/RevokedTokensModel';
import { IUser } from '../../interfaces';

export const verifyAuthorization = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;
  if (!token) {
    return response.status(401).json({ message: NOT_AUTHORIZATED });
  }

  try {
    const decodedInfos = verifyToken({ token, response });

    if (!decodedInfos) return;

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

    return response.status(401).json({ message: NOT_AUTHORIZATED });
  } catch (error) {
    response.status(401).json({ message: NOT_AUTHORIZATED });
  }
};
