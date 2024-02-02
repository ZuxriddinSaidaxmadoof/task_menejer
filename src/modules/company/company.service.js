import { ResData } from "../../common/resData.js";
import { CompanyRepository } from "./company.repository.js";
import { CompanyException, CompanyNotFoundException } from "./exception/company.exception.js";
import { CompanyEntity } from "./entity/company.entity.js";

export class CompanyService {
  #repository;
  constructor() {
    this.#repository = new CompanyRepository();
  }

  async getAll() {
    const brands = await this.#repository.getAll();

    const resData = new ResData("get all companies", 200, brands);

    return resData;
  }

  async getById(Id) {
    const brandId = await this.#repository.getOneById(Id);

    if (!brandId) {
      throw new CompanyNotFoundException();
    }

    const resData = new ResData("get all company", 200, brandId);

    return resData;
  }

  async create(dto) {
    const newBrand = new CompanyEntity(dto);
    const checkName = await this.#repository.getOneByName(newBrand.name);
    if(checkName){
      throw new CompanyException(`This name '${newBrand.name}' already exist`)
    } 

    const Brands = await this.#repository.create(newBrand);

    const resData = new ResData("company created", 200, Brands);

    return resData;
  }

  async update(dto, id) {
    const checkCompanyExist = await this.#repository.getOneById(id);
    if(!checkCompanyExist){
      throw new CompanyNotFoundException();
    }

    const checkName = await this.#repository.getOneByName(dto.name);
    if(checkName){
      throw new CompanyException(`This name '${dto.name}' already exist`)
    } 
    const updateBrand = await this.#repository.update(dto, id)

    const resData = new ResData("updated by id", 200, updateBrand);

    return resData;
  }

  async delete(Id) {
    const brandId = await this.#repository.getOneById(Id);

    if (!brandId) {
      throw new CompanyNotFoundException();
    }

    const deleteBrand = await this.#repository.delete(Id);

    const resData = new ResData("deleted Id", 200, brandId);

    return resData;
  }
}
