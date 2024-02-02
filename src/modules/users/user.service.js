import { ResData } from "../../common/resData.js";
import {
  UserBadRequestException,
  UserNotCreatedException,
  UserNotFoundException,
  UserLoginAlreadyExistException
} from "./exception/user.exception.js";
import { UserRepository } from "./user.repository.js";
import { CompanyRepository } from "../company/company.repository.js";
import { UserEntity } from "./entity/user.entity.js";
import { hashed, compare } from "./../../lib/bcript.js";
import { generateToken, verifyToken } from "../../lib/jwt.js";

export class UserService {
  #repository;
  #companyRepository;
  constructor() {
    this.#repository = new UserRepository();
    this.#companyRepository = new CompanyRepository();
  }

  async getAll() {
    const foundAll = await this.#repository.getAll();

    const resData = new ResData("get all users", 200, foundAll);

    return resData;
  }

  async getById(Id) {
    const userId = await this.#repository.getById(Id);

    if (!userId) {
      throw new UserNotFoundException();
    }

    const resData = new ResData("get by id users", 200, userId);

    return resData;
  }

  async getByCompanyId(companyId) {
    const foundCompany = await this.#companyRepository.getOneById(companyId);
    if(!foundCompany){
      throw new UserBadRequestException("Company not found")
    }

    const userId = await this.#repository.getByCompanyId(companyId);
console.log();
    if (!userId.length) {
      throw new UserBadRequestException("This company has not any users");
    }

    const resData = new ResData("get by company id", 200, userId);

    return resData;
  }

  async getByLogin(login) {
    const foundByLogin = await this.#repository.getByLogin(login);

    let resData;

    if (foundByLogin) {
      resData = new ResData("success login", 200, foundByLogin);
    } else {
      resData = new ResData("user not found", 404, foundByLogin);
    }

    return resData;
  }

  async create(dto) {
    const hashedPassword = await hashed(dto.password);

    dto.password = hashedPassword;

    const newUser = new UserEntity(dto);
    const createdUser = await this.#repository.create(newUser);

    if (!createdUser) {
      throw new UserNotCreatedException();
    }

    const token = generateToken(createdUser.id);

    const resData = new ResData("successfully created", 201, {
      user: createdUser,
      token,
    });

    return resData;
  }

  async update(data, usersId) {
    const dto = new UserEntity(data);
    const foundById = await this.getById(usersId);
    console.log("by id", foundById);
    if (!foundById.data) {
      throw new UserNotFoundException();
    }

    const foundUser = await this.getByLogin(dto.login);
    console.log("by login", foundUser);
    if (foundUser.data) {
      throw new UserLoginAlreadyExistException();
    }

    const updatedUser = await this.#repository.update(dto, usersId)
    return new ResData("Successfully updated", 200, updatedUser);
  }

  async delete(Id) {
    const userId = await this.#repository.getById(Id);

    if (!userId) {
      throw new UserNotFoundException();
    }

    const deleteBrand = await this.#repository.delete(Id);

    const resData = new ResData("user deleted", 200, deleteBrand);

    return resData;
  }
}
