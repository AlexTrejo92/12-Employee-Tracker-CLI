INSERT INTO departments (department)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO roles (job_title, salary, department_id)
VALUES  ('Salesman', '50000', 1),
        ('Software Engineer', '100000', 2),
        ('Project Manager', '80000', 2),
        ('Product Manager','80000', 2);

INSERT INTO employees (employee_firstName,employee_lastName, employee_roleID, employee_managerID)
VALUES  ('John', 'Smith', 3, null),
        ('Martha', 'Evergreen', 4,1),
        ('Harry', 'Potter', 1,1);