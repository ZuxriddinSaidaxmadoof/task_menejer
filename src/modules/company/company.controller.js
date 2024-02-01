import { ResData } from "../../common/resData.js";
import { CompanyException } from "./exception/company.exception.js";
import { CompanySchema } from "./validation/company.schema.js";

export class CompanyController {
  #companyService;
  constructor(clasController) {
    this.#companyService = clasController;
  }

  async getAll(req, res) {
    try {
      const resData = await this.#companyService.getAll();

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode || 500).json(resData);
    }
  }

  async getById(req, res) {
    try {
      const Id = req.params?.id;

      const resData = await this.#companyService.getById(Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode || 500).json(resData);
    }
  }

  async create(req, res) {
    try {
      const dto = req.body;

      const validated = CompanySchema.validate(dto);

      if (validated.error) {
        throw new CompanyException(validated.error.message);
      }

      const resData = await this.#companyService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode || 500).json(resData);
    }
  }

  async update(req, res) {
    try {
      const Id = Number(req.params?.id);
      const dto = req.body;

      const data = { name: dto.name, is_public: dto.isPublic, id: Id };

      const validated = CompanySchema.validate(dto);

      if (validated.error) {
        throw new CompanyException(validated.error.message);
      }

      const resData = await this.#companyService.update(data);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode || 500).json(resData);
    }
  }

  async delete(req, res) {
    try {
      const Id = req.params?.id;

      const resData = await this.#companyService.delete(Id);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode, null, error);

      res.status(resData.statusCode || 500).json(resData);
    }
  }
}
