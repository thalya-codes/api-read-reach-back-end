import JWT from 'jsonwebtoken';
import { Response } from 'express';
import { IGenerateJWTPayload } from '../../interfaces';
import { FAIL_TOKEN_GENERATION, SUCCESSFUL_OPERATION } from '../../errors';

export async function generateJWT(
  payload: IGenerateJWTPayload,
  response: Response
) {
  JWT.sign(
    { payload },
    process.env.JWT_SECRET as string,
    { expiresIn: '5d', algorithm: 'HS384' },
    (err: Error | null, token: string | undefined) => {
      console.log(token, process.env.JWT_SECRET);
      if (err) response.status(500).json({ message: FAIL_TOKEN_GENERATION });

      response.status(200).json({ token, message: SUCCESSFUL_OPERATION });
    }
  );
}
