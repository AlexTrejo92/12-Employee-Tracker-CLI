DROP DATABASE IF EXISTS employees_db
CREATE DATABASE employees_db

USE employees_db

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_firstName VARCHAR(50) NOT NULL
    employee_lastName VARCHAR (50) NOT NULL
    employee_role VARCHAR(100) NOT NULL
    employee_department VARCHAR(50)
);

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT
    department VARCHAR(100) NOT NULL
)