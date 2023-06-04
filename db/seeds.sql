INSERT INTO employees (employee_firstName,employee_lastName, employee_role, employee_department, salary, employee_manager)
VALUES  ('John', 'Smith', 'Project Manager','Operations','50000','Joan Rivers'),
        ('Martha', 'Evergreen', 'Product Manager','HR','50000','Joan Rivers'),
        ('Harry', 'Potter', 'Magician', 'Logistics','50000','Joan Rivers');

INSERT INTO departments (department)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO roles (roles)
VALUES  ('Salesman'),
        ('Software Engineer'),
        ('Project Manager'),
        ('Product Manager');

INSERT INTO managers (manager)
VALUES  ('Joan Rivers'),
        ('Pep Guardiola'),
        ('Theodore Lasso'),
        ('Joe Perry');