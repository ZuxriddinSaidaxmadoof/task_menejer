import { Postgres } from "../../lib/pg.js";

export class UserParentRepository extends Postgres {
  async getAll() {
    return await this.fetchAll("select * from user_tasks");
  }
  async getById(id) {
    return await this.fetch("select * from user_tasks where id = $1", id);
  }
  
  async getByTaskId(taskId) {
    return await this.fetchAll("select * from user_tasks where task_id = $1;", taskId);
  }
  async getByUserId(userId) {
    return await this.fetchAll("select * from user_tasks where user_id = $1;", userId);
  }
  async create(dto) {
    return await this.fetch(
      "INSERT INTO user_tasks(user_id, task_id, start_at, end_at, started_date, ended_date, status, day) VALUES($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *",
      dto.user_id,
      dto.task_id,
      dto.start_at,
      dto.end_at,
      dto.started_date,
      dto.ended_date,
      dto.status,
      dto.day
    );
  }

  async update(dto, id) {
    return await this.fetch(
      "UPDATE user_tasks SET user_id = $1, task_id = $2, start_at = $3, end_at = $4, started_date = $5, ended_date = $6, status = $7, day = $8 WHERE id = $9 RETURNING *",
      dto.user_id,
      dto.task_id,
      dto.start_at,
      dto.end_at,
      dto.started_date,
      dto.ended_date,
      dto.status,
      dto.day,
      id
    );
  }

  async delete(id) {
    return await this.fetch("DELETE FROM user_tasks WHERE id = $1 RETURNING *;", id);
  }
}
