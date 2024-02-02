import { ResData } from "../../common/resData.js";
import { TaskException } from "./exception/tasks.exception.js";
import { TaskSchema } from './validation/tasks.schema.js';

export class GroupController {
  #groupService;
  constructor(groupService) {
    this.#groupService = groupService;
  }

  async getAll(req, res) {
    try {
      const resData = await this.#groupService.getAll();

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode || 500).json(resData);
    }
  }

  async getById(req, res) {
    try {
      const Id = req.params.id;

      const resData = await this.#groupService.getById(Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode || 500).json(resData);
    }
  }


  async create(req, res) {
    try {
      const dto = req.body;

      const validated = TaskSchema.validate(dto);

      if (validated.error) {
        throw new TaskException(validated.error.message);
      }

      const resData = await this.#groupService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode || 500).json(resData);
    }
  }

  async update(req, res) {
    try {
      const taskId = req.params?.id;
      const dto = req.body;

      const validated = TaskSchema.validate(dto);

      if (validated.error) {
        throw new TaskException(validated.error.message);
      }

      const resData = await this.#groupService.update(dto, taskId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode || 500).json(resData);
    }
  }

  async delete(req, res) {
    try {
      const Id = req.params.id;

      const resData = await this.#groupService.delete(Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode || 500).json(resData);
    }
  }
}
