//need to bring in required packages
const inquirer = require('inquirer');
const showTable = require('console.table');
const mysql = require('mysql2');

//function to view departments
function viewDepartments() {
    database.query('SELECT * FROM employee', (err, data) => {
        if (err) {
            console.log(err + "Fatal Error!");
        } else {
            console.showTable(data);
            start();//goes back to start screen
        }
    })
};

//function to view all roles
function viewRoles() {
    database.query('SELECT * FROM role', (err, data) => {
        if (err) {
            console.log(err + "Fatal Error!");
        } else {
            console.showTable(data);
            start();//goes back to start screen
        }
    })
};

function addDepartment() {
    //prompt user to fill out new department details
    inquirer.prompt([{
        type: 'input',
        name: 'department',
        message: 'Enter new department name.'
    }]).then((res) => {
        database.query('INSERT INTO department (name) VALUES ?', [res.department], (err) => {
            if (err) {
                console.log(err + 'Fatal Error!');
            } else {
                console.table("New department added.");
                start();                  
            }
  
        });

    }).catch((err) => console.log(err));
};

function addRole() {
    
};

function addEmployee() {

};

function updateRole() {

};



module.exports = {viewDepartments, viewRoles, addDepartment, addRole, addEmployee, updateRole};