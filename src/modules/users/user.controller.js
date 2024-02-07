import { ResData } from "../../common/resData.js";
import {
  UserBadRequestException,
  UserLoginAlreadyExistException,
} from "./exception/user.exception.js";
import { validationSchema } from "../../lib/validationSchema.js";
import { userRegisterSchema } from "./validation/user.schema.js";

export class UserController {
  #userService;
  #brandService;
  constructor(userService) {
    this.#userService = userService;
  }

  async getAll(req, res) {

    try {
      const resData = await this.#userService.getAll();

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode || 500).json(resData);
    }
  }

  async getByCompanyId(req, res) {
    try {
      const companyId = req.params.id;
      const resData = await this.#userService.getByCompanyId(companyId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode || 500).json(resData);
    }
  }

  async getById(req, res) {
    try {
      const Id = req.params.id;

      const resData = await this.#userService.getById(Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);
      res.status(resData.statusCode || 500).json(resData);
    }
  }

  async register(req, res) {
    try {
      const dto = req.body;

      validationSchema(userRegisterSchema, dto);

      const resDataGetByLogin = await this.#userService.getByLogin(dto.login);

      if (resDataGetByLogin.data) {
        throw new UserLoginAlreadyExistException();
      }

      const resData = await this.#userService.create(dto, res);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      console.log(error);
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode || 500).json(resData);
    }
  }

  // async loginUser(req, res) {
  //   try {
  //     const dto = req.body;

  //     validationSchema(userRegisterSchema, dto);

  //     const resDataGetByLogin = await this.#userService.getByLogin(dto.login);

  //     if (resDataGetByLogin.data) {
  //       throw new UserLoginAlreadyExistException();
  //     }

  //     const resData = await this.#userService.create(dto);

  //     res.status(resData.statusCode).json(resData);
  //   } catch (error) {
  //     console.log(error);
  //     const resData = new ResData(error.message, error.statusCode, null, error);

  //     res.status(resData.statusCode || 500).json(resData);
  //   }
  // }

  async update(req, res) {
    try {
      const dto = req.body;
      const userId = req.params.id

      const validated = userRegisterSchema.validate(dto);
      

      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }

      const resData = await this.#userService.update(dto, userId);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);
      res.status(resData.statusCode || 500).json(resData);
    }
  }

  async delete(req, res) {
    try {
      const Id = req.params.id;

      const resData = await this.#userService.delete(Id);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);
      res.status(resData.statusCode || 500).json(resData);
    }
  }
}
