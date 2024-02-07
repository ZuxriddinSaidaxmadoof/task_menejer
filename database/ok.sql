CREATE DATABASE task_menejment;


CREATE TYPE role_type AS ENUM
('superAdmin', 'admin', 'manager', 'worker');

CREATE TYPE status_type AS ENUM
('process', 'done', 'took');

CREATE TABLE companies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) UNIQUE NOT NULL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    full_name VARCHAR (64) DEFAULT NULL,
    company_id int DEFAULT NULL,
    role role_type DEFAULT 'worker',
    constraint fk_company_id foreign key(company_id) references companies(id)
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    company_id int NOT NULL,
    parent_id int DEFAULT NULL,
    day INT NOT NULL CHECK(day > 0),
    constraint fk_company_id foreign key(company_id) references companies(id),
    constraint fk_parent_id foreign key(parent_id) references tasks(id)
);

CREATE TABLE user_tasks(
    id SERIAL PRIMARY KEY,
    user_id int NOT NULL,
    task_id int NOT NULL,
    start_at date not null,
    end_at date not null,
    started_date date default null,
    ended_date date default null,
    status status_type not null default 'process',
    day INT NOT NULL CHECK(day > 0),
    constraint fk_user_id foreign key(user_id) references users(id),
    constraint fk_task_id foreign key(task_id) references tasks(id)
);

insert into user_tasks(user_id, task_id, start_at, end_at, day)values(1,1,'2000-12-02','2000-12-02', 23);

CREATE TABLE audit_companies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) UNIQUE NOT NULL,
    created_at date default now(),
    status VARCHAR not null
);

CREATE TABLE audit_users(
    id SERIAL PRIMARY KEY,
    login VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR (64) DEFAULT NULL,
    company_id int DEFAULT NULL,
    role role_type DEFAULT 'worker'
);

///////////////// TRIGGERS FOR COMPANY //////////////////////////

// INSERT TRIGGER FOR COMPANIES

CREATE FUNCTION fr_insert_company() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
    INSERT INTO audit_companies(id, name, status)
    VALUES (new.id, new.name, 'insert');
    return new;
END
$$;

CREATE TRIGGER insert_trigger

   AFTER INSERT
   ON companies
   FOR EACH ROW 
EXECUTE PROCEDURE fr_insert_company();


// UPDATE TRIGGER FOR COMPANIES

CREATE FUNCTION fr_update_company() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
    INSERT INTO audit_companies(id, name, status)
    VALUES (new.id, new.name, 'update');
    return new;
END
$$;

CREATE TRIGGER update_trigger

   AFTER UPDATE
   ON companies
   FOR EACH ROW 
EXECUTE PROCEDURE fr_update_company();


// DELETE TRIGGER FOR COMPANIES

CREATE FUNCTION fr_delete_company() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
    INSERT INTO audit_companies(id, name, status)
    VALUES (old.id, old.name, 'delete');
    return old;
END
$$;

CREATE TRIGGER delete_trigger

   AFTER DELETE
   ON companies
   FOR EACH ROW 
EXECUTE PROCEDURE fr_delete_company();

///////////////////////TRIGGER FOR USER/////////////////////////

// DELETE TRIGGER FOR USERS

CREATE FUNCTION fr_delete_user() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
    INSERT INTO audit_users(id, login, full_name, company_id, role )
    VALUES (old.id, old.login, old.full_name, old.company_id, old.role);
    return old;
END
$$;

CREATE TRIGGER delete_trigger

   AFTER DELETE
   ON users
   FOR EACH ROW 
EXECUTE PROCEDURE fr_delete_user();

