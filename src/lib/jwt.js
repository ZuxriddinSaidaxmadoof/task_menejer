import jwt from "jsonwebtoken";

import { config } from "../common/config/index.js";

export const generateToken = (data) => {
  const token = jwt.sign({ data}, config.jwtKey, {expiresIn: '3h'});
  return token;
}

export const verifyToken = (token) => {
  return jwt.verify(token, config.jwtKey);
};
