SELECT * FROM roles JOIN employees ON roles.id = employee_roleID;

SELECT * FROM employees JOIN roles ON employees.employee_roleID = roles.id;

SELECT * FROM employees JOIN roles ON employees.employee_roleID = roles.id JOIN departments ON roles.department_id = departments.id;