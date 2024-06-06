import JWT from 'jsonwebtoken';
import { Response } from 'express';
import { IGenerateJWTPayload } from '../../interfaces';
import {
  FAIL_TOKEN_GENERATION,
  HttpError,
  SUCCESSFUL_OPERATION,
} from '../../errors';

export async function generateJWT(
  payload: IGenerateJWTPayload,
  response: Response
) {
  JWT.sign(
    { payload },
    process.env.JWT_SECRET as string,
    { expiresIn: '5d', algorithm: 'HS384' },
    (err: Error | null, token: string | undefined) => {
      if (err) {
        response
          .status(500)
          .json({ status: 500, message: FAIL_TOKEN_GENERATION });

        throw new HttpError(FAIL_TOKEN_GENERATION, 500);
      }

      response
        .status(200)
        .json({ status: 200, token, message: SUCCESSFUL_OPERATION });
    }
  );
}
