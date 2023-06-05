DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(50) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_firstName VARCHAR(50) NOT NULL,
    employee_lastName VARCHAR (50) NOT NULL,
    employee_roleID INT NOT NULL,
    FOREIGN KEY (employee_roleID) REFERENCES roles(id),
    employee_managerID INT NULL,
    FOREIGN KEY (employee_managerID) REFERENCES employees(id)
);