const mysql = require('mysql2');
const inquirer = require('inquirer');

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
    inquirer.prompt(questions).then((response) => {
        console.log(response.firstPrompt)
        if (response.firstPrompt === 'View All Employees') {
            console.log('This will show all employees in organization');
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

init();


// function testingF(response) {console.log(response.firstPrompt)};

// testingF();
