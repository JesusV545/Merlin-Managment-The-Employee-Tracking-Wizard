//need to bring in required packages
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const showTable = require('console.table');
//plug in my functions js for functionality
const {viewDepartments, viewRoles, addDepartment, addRole, addEmployee, updateRole} = require('./functions');

//make variables for required packages
const app = express();

//need some middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//need to make connection to localhost with standard key values
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //insert your MySql password here
    password: 'Penguin0294*',
    database: 'employees_db'
    
});

//uses console.table to prepare and connect 
database.connect(function (err) {
  if (err) {
    console.log(err + "There was an issue!");
  } else {
    console.log("Connected as id " + connection.threadId + "\n");
    start();//after connection start the whole program
  }

});

function start() {
//need to start the inquirer prompt for the questions
  inquirer.prompt({
    type: 'choices',
    name: 'event',
    message: 'What wizardly spells would you like to cast?',
    choices: ['View all departments', 
              'View all employee roles', 
              'Add a department', 
              'Add a department role', 
              'Add a new employee', 
              'Update an employee role'],
    //use the response data
  }).then((answer) => {
    //display the user choice
    console.log(answer.event);
      //need to make like a switch statement to execute the user choice
      switch(answer.event) {
        case "View all departments":
          viewDepartments();
          break;

        case "View all employee roles":
          viewRoles();
          break;
        
        case "Add a department":
          addDepartment();
          break;
        
        case "Add a department role":
          addRole();
          break;
      
        case "Add a new employee":
          addEmployee();
          break;
        
        case "Update an employee role":
          updateRole();
          break;

        default:
          connection.end();
      }


  }).catch((error) => {
    //let the user know that their logo was not created successfully
    console.log(error);
    console.log('There was a problem with your connections!')

  });

}


