//need to bring in required packages
const inquirer = require('inquirer');
const express = require('express');
const console = require('console.table');
const mysql = require('mysql2');

//make variables for required packages
const app = express();
const PORT = process.env.PORT || 3001;

//need some middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//need to make connection to localhost with standard key values
const database = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    //insert your MySql password here
    password: 'YourPasswordHere',
    database: 'employees_db'
    }, 
    //need to let the user know that they successfully connected to the right database
    console.log('Connected to employees_db database.')
);




// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });