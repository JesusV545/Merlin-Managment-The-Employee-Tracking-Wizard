//need to bring in required packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

//need to make connection to localhost with standard key values
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //insert your MySql password here
    password: '',
    database: 'employees_db'
    
});

//uses console.table to prepare and connect 
database.connect(function (err) {
  if (err) {
    console.log(err + " There was an issue!");
  } else {
    console.log("Connected as id " + database.threadId + "\n");
    start();//after connection start the whole program
  }

});

function start() {
//need to start the inquirer prompt for the questions
  inquirer.prompt({
    type: 'list',
    name: 'event',
    message: 'What wizardly spells would you like to cast?',
    choices: ['View all departments', 
              'View all employees',
              'View all roles', 
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

        case "View all employees":
          viewEmployees();
          break;

        case "View all roles":
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
    console.log(' There was a problem with your connections!')

  });

}
   
//function to view departments
function viewDepartments() {
  database.query('SELECT * FROM department', (err, data) => {
      if (err) {
          console.log(err + " Fatal Error!");
      } else {
          console.table(data);
          start();//goes back to start screen
      }
  })
};
//function to view all employees

function viewEmployees() {
  database.query(`SELECT 
                  employee.id, 
                  employee.first_name, 
                  employee.last_name, 
                  role.title AS job_title, 
                  department.name AS department, 
                  role.salary, 
                  CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
                  FROM 
                  employee 
                  INNER JOIN role ON employee.role_id = role.id 
                  INNER JOIN department ON role.department_id = department.id 
                  LEFT JOIN employee manager ON employee.manager_id = manager.id;`, 
    (err, data) => {
      if (err) {
          console.log(err + " Fatal Error!");
      } else {
          console.table(data);
          start();//goes back to start screen
      }
  })
};

//function to view all roles
function viewRoles() {
  database.query('SELECT * FROM role', (err, data) => {
      if (err) {
          console.log(err + " Fatal Error!");
      } else {
          console.table(data);
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
  }]).then((data) => {
      database.query('INSERT INTO department (name) VALUES (?)', data.department, (err) => {
          if (err) {
              console.log(err + ' Fatal Error!');
          } else {
              console.table("New department added.");
              start();                  
          }

      });

  }).catch((err) => console.log(err));
};

//function to add role 
function addRole() {
  //need to prompt user to fill out role details 
  inquirer.prompt([
  {
      type: 'input',
      name: 'title',
      message: 'Enter new role title.'
  },
  {
      type: 'number',
      name: 'salary',
      message: 'Enter new role salary.'
  },
  {   type: 'number',
      name: 'department',
      message: "Enter new role department ID."
  }
  ]).then((data) => {
      database.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [data.title, data.salary, data.department], (err, data) => {
          if (err) {
              console.log(err + ' Fatal Error!');
          } else {
              console.table('New role added!');
              start();                  
          }
      }) 

  }).catch((err) => console.log(err));
};

//function to add employee
function addEmployee() {
  //need to prompt user to fill out new employee info
  inquirer.prompt([
      {
          type: 'input',
          name: 'first_name',
          message: "Enter new employee's first name."
      },
      {
          type: 'input',
          name: 'last_name',
          message: "Enter new employee's last name."
      },
      {   type: 'number',
          name: 'role',
          message: "Enter new employee's role ID."
      },
      {
          type: 'input',
          name: 'manager',
          message: "Enter manager ID for new employee."
      },
  ]).then((data) => {
      database.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [data.first_name, data.last_name, data.role, data.manager], (err, data) => {
          if (err) {
              console.log(err + ' Fatal Error!');
          } else {
              console.table('New employee added!');
              start();                  
          }
      })
  })
};

//function to update an employee
function updateRole() {
  //need to prompt the user what they need to change
  inquirer.prompt([
      {
          type: 'input',
          name: 'name',
          message: "Which employee's role would you like to update. (first name)"
      },
      {
          type: 'number',
          name: 'role',
          message: "Enter new role ID for employee."
      }
  ]).then((data) => {
      database.query('UPDATE employee SET role_id = (?) WHERE first_name = (?)', [data.role, data.name], (err, data) => {
          if (err) {
              console.log(err + ' Fatal Error!');
          } else {
              console.table('Successfully updated the employee!');
              start();                  
          }
      })
  })
};

