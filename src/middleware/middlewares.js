import { roles } from "../common/enums/roles.js";
import { ResData } from "../common/resData.js";
import { verifyToken } from "../lib/jwt.js";
import { UserService } from "../modules/user/user.service.js";
import {
  AuthorizationTokenRequiredException,
  AuthorizationUserIdRequiredException,
  ForbidenAdminRoleException,
} from "./exception/middleware.exception.js";

export class AuthorizationMiddleware {
  async checkToken(req, res, next) {
    try {
      const token = req.headers.token;

      if (!token) {
        throw new AuthorizationTokenRequiredException();
      }

      const { data: userId } = verifyToken(token);

      if (!userId) {
        throw new AuthorizationUserIdRequiredException();
      }

      req.userId = userId;

      return next();
    } catch (error) {
      const resData = new ResData(error.message, 401, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async checkUser(req, res, next) {
    try {
      const userId = req.userId;

      if (!userId) {
        throw new AuthorizationUserIdRequiredException();
      }

      const userService = new UserService();

      const { data: currentUser } = await userService.findById(userId);

      req.currentUser = currentUser;

      return next();
    } catch (error) {
      const resData = new ResData(error.message, 401, null, error);

      res.status(resData.statusCode).json(resData);
    }
  }

  async checkAdminRole(req, res, next) {
    try {
      const currentUser = req.currentUser;

      if (currentUser.role !== roles.ADMIN) {
        throw new ForbidenAdminRoleException();
      }

      return next();
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }
}
