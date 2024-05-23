import { Response } from 'express';
import { hash } from 'bcrypt';
import { UserModel } from '../models/UserModel';
import { SUCCESSFUL_OPERATION } from '../errors';
import { IUser } from '../interfaces/IUser';

export async function createUser(
  response: Response,
  { email, password, ...restBody }: IUser
) {
  const passwordHash = await hash(password, 8);
  await UserModel.create({ email, password: passwordHash, ...restBody });
  response.status(201).json({ message: SUCCESSFUL_OPERATION });
}
