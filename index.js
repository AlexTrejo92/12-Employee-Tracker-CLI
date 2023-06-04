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

const databaseInfo = db.query('SELECT * FROM employees', (err, DBresults) => {
return DBresults;
})

console.log(databaseInfo);
// Array that will be used in inquirer to trigger the list of options the user will be able to select.
const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        /*default() {
            return 'Use arrow keys'
        },*/
        name: 'userSelection',
        choices: ['View All Employees', 'Add Employee', 'Update an Employee Role', 'View All Roles', 'Add Role', 'View All Departments','Add Department','Quit']
    }
];
// Code to print the Header with AsciiArt
const printLogo = () => console.log(logo(config).render());
printLogo();

// This function adds a new employee to the employees_db
function addEmployee() {
    //Inquirer gathers the data from the user for the new employee
    inquirer.prompt(
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
                //TODO: Figure out how to pull info from the DATABASE so I can use the existing roles and display them as choices.
                choices: ['1st role','2nd role'],
            },
            {
                type: 'list',
                message: 'Employee\'s department?',
                //TODO: Figure out how to pull info from the DATABASE so I can use the existing departments as choices.
                name: 'newEmployeeDepartment',
                choices: ['Sales', 'Engineering', 'Finance', 'Legal']
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
                choices: ['1st','2nd'],
            }
        ]
    ).then((response) => {
        console.log(response);
        db.query(
            `INSERT INTO employees (employee_firstName, employee_lastName, employee_role, employee_department, salary, employee_manager)
            VALUES  ('${response.newEmployeeFN}'),
                    ('${response.newEmployeeLN}'),
                    ('${response.newEmployeeRole}'),
                    ('${response.newEmployeeDepartment}'),
                    ('${response.newEmployeeSalary}'),
                    ('${response.newEmployeeManager}');
                `);
        console.log('Added ' + response.newEmployeeFN + '  ' + response.newEmployeeLN + ' to the database')
    })
}

function showDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.log("\n");
        console.table(results);
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    })
}

function showRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        console.log("\n");
        console.table(results);
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    })
}

function init() {

    inquirer.prompt(questions).then((response) => {
        const userSelection = response.userSelection;

        switch (userSelection) {

            case 'View All Employees':
                console.log('This will show all employees in organization');
                db.query('SELECT * FROM employees', function (err, results) {
                    console.log("\n");
                    console.table(results);
                    console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
                })
            break;

            case 'View All Roles':
                showRoles();
            break;

            case 'Add Employee':
                addEmployee();
            break;

            case 'View All Departments':
                showDepartments();
            break;

            case 'Quit':
                console.log('Goodbye! see you soon!');
                process.exit()
                return;
        }

        /* Initially the functionality was written using if statements, but decided to use Switch Statements instead
        if (userSelection === 'View All Employees') {
            console.log('This will show all employees in organization');
            db.query('SELECT * FROM employees', function (err, results) {
                console.log("\n");
                console.table(results);
                console.log("\n\n\n\n\n\n\n\n\n\n\n\n");})
        }
        else if (userSelection === 'Add Employee') {
            console.log('this will add a new employee')
        }
        else if (response.userSelection === 'Update Employee Role') {
            console.log('this will update an employee role')
        }
        else if (response.userSelection === 'View All Roles') {console.log('this will show all roles')}
        else if (response.userSelection === 'Add Role') {console.log('this will add a new role')}
        else if (response.userSelection === 'View All Departments') {
            console.log('this will show all departments');
            db.query('SELECT * FROM departments', function (err, results) {
                console.log("\n");
                console.table(results);
                console.log("\n\n\n\n\n\n\n\n\n\n\n\n");})
        }
        else if (response.userSelection === 'Add Department') {console.log('this will show all departments')}
        else if (response.userSelection === 'Quit') {console.log('Goodbye! see you soon!');
        return;} */
    init();
    }
    )
}

init();



