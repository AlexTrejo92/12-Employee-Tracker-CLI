DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_firstName VARCHAR(50) NOT NULL,
    employee_lastName VARCHAR (50) NOT NULL,
    employee_role VARCHAR(100) NOT NULL,
    employee_department VARCHAR(50) NOT NULL,
    salary INT NOT NULL,
    employee_manager VARCHAR(100) NOT NULL
);

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(100) NOT NULL,
    salary INT NOT NULL,
    department VARCHAR(50) NOT NULL,
);

CREATE TABLE managers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    manager VARCHAR(100)
);