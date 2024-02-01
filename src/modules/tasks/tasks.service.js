import { TaskRepository } from "./tasks.repository.js";
import { CompanyRepository } from "../company/company.repository.js";
import { ResData } from "../../common/resData.js";
import { TaskNotFoundException, TaskException } from "./exception/tasks.exception.js";
import { TaskEntity } from './entity/tasks.entity.js';


export class GroupService {
  #repository;
  #companyRepository;
  constructor() {
    this.#repository = new TaskRepository();
    this.#companyRepository = new CompanyRepository();
  }

  async getAll() {
    const groups = await this.#repository.getAll();

    const resData = new ResData("Get all tasks", 200, groups);

    return resData;
  }

  async getById(id) {
    const groupId = await this.#repository.getById(id);

    if (!groupId) {
      throw new TaskNotFoundException();
    }

    const resData = new ResData("Get by id tasks", 200, groupId);

    return resData;
  }

  async create(dto) {
    const newTask = new TaskEntity(dto);

    const checkCompanyExist = await this.#companyRepository.getOneById(newTask.company_id);
    if(!checkCompanyExist){
      throw new TaskException(`${newTask.company_id} company not found`)
    }

    const task = await this.#repository.create(newTask);

    const resData = new ResData("Successfully created", 201, task);

    return resData;
  }

  async update(dto, taskId) {
    const foundTask = await this.#repository.getById(taskId);

    if (!foundTask) {
      throw new TaskNotFoundException();
    }

    const newTask = new TaskEntity(dto);
    const checkCompanyExist = await this.#companyRepository.getOneById(newTask.company_id);
    if(!checkCompanyExist){
      throw new TaskException(`${newTask.company_id} company not found`)
    }

    const updatedTest = await this.#repository.update(newTask, taskId);

    const resData =  new ResData("test successfully updated", 200, updatedTest);

    return resData;
  }

  async delete(id) {
    const groupId = await this.#repository.getById(id);

    if (!groupId) {
      throw new TaskNotFoundException();
    }

    const deleteGroup = await this.#repository.delete(id);

    const resData = new ResData("test successfully deleted", 200, deleteGroup);

    return resData;
  }
}
