import { Response } from 'express';
import { validateFields } from '../utils/validateFields';
import { createUser } from '../utils/createUser';
import { IUserRequest } from '../interfaces/IRequests';
import { validateCredentials } from '../utils/auth/validateCredentials';
import { generateJWT } from '../utils/auth/generateJWT';
import { RevokedTokensController } from './RevokedTokensController';

export class UserController {
  static async createUser(
    { body }: IUserRequest<{ name: string }>,
    response: Response
  ) {
    const { name, email, password } = body;

    try {
      validateFields({ name, email, password });
      await createUser(response, body);
    } catch (error: any) {
      response.status(error.status || 500).json(error);
    }
  }

  static async login(
    { body: { email, password } }: IUserRequest,
    response: Response
  ) {
    try {
      const user = (await validateCredentials({ email, password })) as any;
      await generateJWT({ id: user.id! }, response);
    } catch (error: any) {
      response.status(error.status || 500).json(error);
    }
  }

  static async logout({ body: { token, user_id } }: any, response: Response) {
    try {
      await RevokedTokensController.add({ token, user_id }, response);
    } catch (error: any) {
      response
        .status(error.status || 500)
        .json({ message: error?.message || error });
    }
  }
}
