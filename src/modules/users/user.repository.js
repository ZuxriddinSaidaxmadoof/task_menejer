import { Postgres } from "../../lib/pg.js";

export class UserRepository extends Postgres {
  async getAll() {
    return await this.fetchAll("select * from users");
  }
  async getByLogin(login) {
    return await this.fetch("select * from users where login = $1", login);
  }
  async getById(id) {
    return await this.fetch("select * from users where id = $1", id);
  }
  async create(dto) {
    return await this.fetch(
      "insert into users (login, password,full_name,company_id, role) values ($1, $2, $3, $4, $5) returning * ",
      dto.login,
      dto.password,
      dto.full_name,
      dto.company_id,
      dto.role
    );
  }

  async update(dto, userId) {
    return await this.fetch(
      "update users set login = $1, password = $2,full_name = $3,company_id = $4, role = $5 where id = $6 returning * ",
      dto.login,
      dto.password,
      dto.full_name,
      dto.company_id,
      dto.role,
      userId
    );
  }

  async delete(id) {
    return await this.fetch("DELETE FROM users WHERE id = $1 RETURNING *;", id);
  }
}
