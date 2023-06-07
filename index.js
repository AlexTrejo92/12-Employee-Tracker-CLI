const mysql = require('mysql2');
const inquirer = require('inquirer');
// Require the library to insert a logo to the terminal asciiart
const logo = require('asciiart-logo');
const config = require('./package.json');

// connection to mysql database
const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'C1a9t9v2#/k2',
    database: 'employees_db'
    },
    )

// Array that will be used in inquirer to trigger the list of options the user will be able to select.
const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'userSelection',
        choices: [  'View All Employees',
                    'Add Employee',
                    'Update an Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Quit'
                ]
    }
];
// Code to print the Header with AsciiArt
const printLogo = () => console.log(logo(config).render());
printLogo();

// TODO: Fix functionality of this. This function adds a new employee to the employees_db
async function addEmployee() {
    //Inquirer gathers the data from the user for the new employee
    console.log('this will add a new employee');
    try {
        // we store in a variable the information from the database, so that we can later use it in inquirer as choices
        const [departments] = await db.promise().query('Select * from departments');
        const [roles] = await db.promise().query('SELECT * FROM roles');
        const [employees] = await db.promise().query('SELECT * FROM employees');
        // Console logs used to confirm the data from db was pulled correctly
        //console.log(departments);
        //console.log(roles);
        //console.log(employees);
        const answersAdd = await inquirer.prompt(
            [
                {
                    type: 'input',
                    message: 'What is the first name of the employee?',
                    name: 'newEmployeeFN',
                },
                {
                    type: 'input',
                    message: 'What is the last name of the employee?',
                    name: 'newEmployeeLN',
                },
                {
                    type: 'list',
                    message: 'What is the employee\'s role?',
                    name: 'newEmployeeRole',
                    //we use the .map method so that we can look into the roles table and choose a specific row and its id
                    choices: roles.map((role)=>{
                        return { 
                            name: role.job_title, 
                            value: role.id
                        }
                    }),
                },
                {
                    type: 'list',
                    message: 'Employee\'s department?',
                    name: 'newEmployeeDepartment',
                    choices: departments.map((dp)=>{
                        return { 
                            name: dp.department, 
                            value: dp.id
                        }
                    }),
                },
                {
                    type: 'input',
                    message: 'What is the employee\'s salary?',
                    name: 'newEmployeeSalary',
                },
                {
                    type: 'list',
                    message: 'Who is the employee\'s manager?',
                    name: 'newEmployeeManager',
                    choices: employees.map((empl)=>{
                        return{
                            name: empl.employee_firstName+empl.employee_lastName,
                            value: empl.id
                        }
                    }),
                }
            ]
            );
        console.log(answersAdd);
        //make promise
        //db.query('INSERT INTO employees (employee_firstName, employee_lastName, employee_roleID, employee_managerID) VALUES  (?,?,?,?) INSERT INTO roles (job_title, salary, department_id)',[answersAdd.newEmployeeFN, answersAdd.newEmployeeLN,])
        showQuestions();
    } catch (error) {
        console.log(error);
    }
}

function showEmployees() {
    return db.promise().query('SELECT * FROM employees JOIN roles ON employees.employee_roleID = roles.id JOIN departments ON roles.department_id = departments.id;')
}

function showDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
        showQuestions();
    });
    
}

function showRoles() {
    db.query('SELECT * FROM roles JOIN departments ON roles.department_id = departments.id;', function (err, results) {
        console.table(results);
        showQuestions();
    });
    
}
//TODO: Finish this functionality
function addRole() {
    console.log('This will add a new role to database');
        inquirer.prompt([
        {
            name: 'newRole',
            type: 'input',
            message: 'What role would you like to add?'
        },
        {
            name: 'newSalary',
            type: 'input',
            message: 'What is the salary for this role?'
        },
        {
            name: 'newDepartment',
            type: 'input',
            message: 'Which department will this role be in?'
        },
    ]).then((response)=>{
        console.log(response);
        //db.query('INSERT INTO roles ()')
        showQuestions();
    })
    
}
// TODO: FINISH THIS functionality
function updateEmployee() {
    console.log('Update Employee info');
    showQuestions();
}

function addDepartment() {
    console.log('this will add a new department to database');
    inquirer.prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'What department would you like to add?'
        }
    ]).then((response)=>{
        db.query('INSERT INTO departments (department) VALUES (?);',[response.newDepartment], function(error, results){
            console.log('New Department added!');
        })
        showQuestions();
        }).catch((error)=>{console.log(error)});
}

function showQuestions() {

    inquirer.prompt(questions).then((response) => {
        const userSelection = response.userSelection;
// switch statement to use for every option from inquirer
        switch (userSelection) {

            case 'View All Employees':
                console.log('This will show all employees in organization');
                // we use .then as we made showEmployees asynchronous
                showEmployees().then(([rows,columns]) =>{
                    console.table(rows)
                    showQuestions();
                });
            break;

            case 'View All Roles':
                showRoles();
            break;

            case 'View All Departments':
                showDepartments();
            break;

            case 'Add Employee':
                addEmployee();
            break;

            case 'Add Role':
                addRole();
            break;

            case 'Add Department':
                addDepartment();
            break;

            case 'Update an Employee Role':
                updateEmployee();
            break;

            case 'Quit':
                console.log('Goodbye! see you soon!');
                process.exit()
                return;
        }
    }
    )
};
// This function triggers Inquirer so the user can select different options to use the app.
showQuestions();



