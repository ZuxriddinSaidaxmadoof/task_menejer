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

  async getByTaskId(id) {
    const foundTask = await this.#taskRepository.getById(id);
    if(!foundTask){
      throw new UserTaskException("Task not found");
    }

    const tasks = await this.#repository.getByTaskId(id);

    if (!tasks.length) {
      throw new UserTaskException("This task is not given to anyone");
    }

    const resData = new ResData("Get by task id", 200, tasks);

    return resData;
  }

  async getByUserId(id) {
    const foundUser = await this.#repository.getById(id);
    console.log("found user", foundUser);
    if (!foundUser) {
      throw new UserTaskException("user not found");
    }

    const tasks = await this.#repository.getByUserId(id);
    if (!tasks.length) {
      throw new UserTaskException("this user has not got any tasks");
    }
    console.log("Tasks", tasks);

    const resData = new ResData("Get by user id", 200, tasks);

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
    const newUserTask = new UserTaskEntity(dto);

    const userTask = await this.#repository.getById(userTaskId);
    if (!userTask) {
      throw new UserTaskNotFoundException();
    }

    const foundUser = await this.#userRepository.getById(newUserTask.user_id);
    if(!foundUser){
      throw new UserTaskException("user not found");
    }

    const foundTask = await this.#taskRepository.getById(newUserTask.task_id);
    if(!foundTask){
      throw new UserTaskException("task not found");
    }

    const updatedUserTask = await this.#repository.update(newUserTask, userTaskId)
    console.log("updated", updatedUserTask);

    const resData = new ResData("user task successfully updated", 200, updatedUserTask);

    return resData;
  }

  async delete(id) {

    const userTaskId = await this.#repository.getById(id);

    if (!userTaskId) {
      throw new UserTaskNotFoundException();
    }

    const deletedUserParent = await this.#repository.delete(id);

    const resData =  new ResData("user task successfully deleted", 200, deletedUserParent);

    return resData;
  }
}
