DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

Use company_db;

CREATE TABLE department(
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(30) NOT NULL,
);

CREATE TABLE role(
id INT NOT NULL PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL(9,2) NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (department_id)
REFERENCES department(id)
);

CREATE TABLE employee(
id INT NOT NULL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30),
role_id INT FOREIGN KEY REFERENCES role(id),
manager_id INT NULL FOREIGN KEY REFERENCES employee(id),
);