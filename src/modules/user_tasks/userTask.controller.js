import { ResData } from "../../common/resData.js";
import { UserTaskException } from "./exception/userTask.exception.js";
import { UserTaskSchema } from "./validation/userTask.schema.js";

export class UserParentController {
  #userTaskService;
  constructor(userTaskService) {
    this.#userTaskService = userTaskService;
  }

  async getAll(req, res) {
    try {
      const resData = await this.#userTaskService.getAll();

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);
      return res.status(resData.statusCode || 500).json(resData);
    }
  }

  async getById(req, res) {
    try {
      const Id = req.params.id;

      const resData = await this.#userTaskService.getById(Id);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      return res.status(resData.statusCode || 500).json(resData);
    }
  }

  async create(req, res) {
    try {
      const dto = req.body;

      const validated = UserTaskSchema.validate(dto);
      if (validated.error) {
        throw new ResData(validated.error.message || "error on validation", 401);
      }
      const resData = await this.#userTaskService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
console.log(error);

      const resData = new ResData(error.message, error.statusCode, null, error);

      return res.status(resData.statusCode || 500).json(resData);
    }
  }


  async update(req, res) {
    try {
      const Id = req.params.id;
      const dto = req.body;

      const userTaskValidated = UserTaskSchema.validate(dto);

      if(userTaskValidated.error){
        throw new UserTaskException(userTaskValidated.error.message)
      }

      const resData = await this.#userTaskService.update(data, Id);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      return res.status(resData.statusCode || 500).json(resData);
    }
  }

  async delete(req, res) {
    try {
      const Id = req.params.id;

      const resData = await this.#userTaskService.delete(Id);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      return res.status(resData.statusCode || 500).json(resData);
    }
  }
}
