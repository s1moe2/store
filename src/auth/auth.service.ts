import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as config from "../config";
import { getByUsername } from '../users/users.service';

export const signin = async (username: string, password: string) => {
  const user = getByUsername(username);
  if (!user) {
    return undefined;
  }

  const isValid = await bcrypt.compare(password, user.password ?? "");
  if (!isValid) {
    return undefined;
  }

  return jwt.sign({ userId: user.id }, config.JWT_SECRET);
}