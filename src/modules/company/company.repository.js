import { Postgres } from "../../lib/pg.js";

export class CompanyRepository extends Postgres {
  async getAll() {
    return await this.fetchAll("select * from companies");
  }
  async getOneById(id) {
    return await this.fetch("select * from companies where id = $1", id);
  }
  async getOneByName(name) {
    return await this.fetch("select * from companies where name = $1", name);
  }
  async create(dto) {
    return await this.fetch(
      "INSERT INTO companies(name) VALUES ($1) RETURNING * ;",
      dto.name
    );
  }
  async update(dto, id) {
    return await this.fetch(
      "UPDATE companies SET name = $1 WHERE id = $2 RETURNING *",
      dto.name,
      id
    );
  }
  async delete(id) {
    return await this.fetch("DELETE FROM companies WHERE id = $1;", id);
  }
}
