import { ResData } from "../../common/resData.js";
import { UserTaskEntity } from "./entity/userTask.entity.js";
import { UserTaskNotFoundException, UserTaskException  } from "./exception/userTask.exception.js";
import { UserParentRepository } from "./userTask.repository.js";
import { UserRepository } from "../users/user.repository.js";
import { TaskRepository } from "../tasks/tasks.repository.js";

export class UserParentService {
  #userRepository;
  #taskRepository;
  #repository;
  constructor() {
    this.#repository = new UserParentRepository();
    this.#userRepository = new UserRepository();
    this.#taskRepository = new TaskRepository();
  }

  async getAll() {
    const UserParents = await this.#repository.getAll();

    const resData =  new ResData("get all User tasks", 200, UserParents);

    return resData;
  }

  async getById(id) {
    const UserParentId = await this.#repository.getById(id);

    if (!UserParentId) {
      throw new UserTaskNotFoundException( UserTaskException);
    }
    
    const resData = new ResData("get one user task", 200, UserParentId);

    return resData;
  }

  async create(dto) {
    const newUserTask = new UserTaskEntity(dto);

    const foundUser = await this.#userRepository.getById(newUserTask.user_id);
    if(!foundUser){
      throw new UserTaskException("user not found")
    }
    const foundTest = await this.#taskRepository.getById(newUserTask.task_id);
    if(!foundTest){
      throw new UserTaskException("task not found")
    }

    console.log(newUserTask);

    const UserParent = await this.#repository.create(newUserTask);
    console.log(UserParent);

    const resData =  new ResData("user task successfully created", 201, UserParent);

    return resData;
  }

  async update(dto, userTaskId) {
    const userTask = await this.#repository.getById(userTaskId);

    if (!userTask) {
      throw new UserTaskNotFoundException();
    }

    const updatedUserParent = await this.#repository.update(dto)

    const resData = new ResData("user task successfully updated", 200, updatedUserParent);

    return resData;
  }

  async delete(id) {

    const UserParentId = await this.#repository.getById(id);

    if (!UserParentId) {
      throw new UserTaskNotFoundException( UserTaskException);
    }

    const deletedUserParent = await this.#repository.delete(id);

    const resData =  new ResData("user task successfully deleted", 200, UserParentId);

    return resData;
  }
}
