import JWT from 'jsonwebtoken';
import { IVerifyTokens } from '../../interfaces';

export function verifyToken({ token, response, errorMsg }: IVerifyTokens) {
  try {
    return JWT.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    response.status(401).json({ message: errorMsg || error });
    return null;
  }
}
