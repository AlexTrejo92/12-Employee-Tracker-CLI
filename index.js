const mysql = require('mysql2');
const inquirer = require('inquirer');
// Require the librarie to insert a logo to the terminal asciiart
const logo = require('asciiart-logo');
const config = require('./package.json');


const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        default() {
            return 'Use arrow keys'
        },
        name: 'firstPrompt',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments','Add Department','Quit']
    }
];

function init() {
    console.log(logo(config).render());
    inquirer.prompt(questions).then((response) => {
        console.log(response.firstPrompt)
        if (response.firstPrompt === 'View All Employees') {
            console.log('This will show all employees in organization');
            console.table()
            // TODO: code to pull data from database of employees
        }
        else if (response.firstPrompt === 'Add Employee') {
            console.log('this will add a new employee')
        }
        else if (response.firstPrompt === 'Update Employee Role') {
            console.log('this will update an employee role')
        }
        else if (response.firstPrompt === 'View All Roles') {console.log('this will show all roles')}
        else if (response.firstPrompt === 'Add Role') {console.log('this will add a new role')}
        else if (response.firstPrompt === 'View All Departments') {console.log('this will show all departments')}
    })
}


// connection to mysql database
const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'C1a9t9v2#/k2',
    database: 'movies_db'
    },
    console.log('Connected to the employees_db database')
    )




init();


// function testingF(response) {console.log(response.firstPrompt)};

// testingF();


