import {
  HttpError,
  ALREADY_EXISTING_USER,
  REQUIRED_REGISTER_FIELDS_NOT_FILLED,
} from '../errors';
import { IUserBaseInfos } from '../interfaces/IUser';
import { UserModel } from '../models/UserModel';

export async function validateFields({
  email,
  password,
  name,
}: IUserBaseInfos<{ name: string }>) {
  if (!email || !name || !password)
    throw new HttpError(REQUIRED_REGISTER_FIELDS_NOT_FILLED, 400);

  const user: any = await UserModel.findOne(email);

  if (user?.email) {
    throw new HttpError(ALREADY_EXISTING_USER, 409);
  }
}
