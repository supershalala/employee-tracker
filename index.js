// import and require fs
const fs = require('fs');

// import and require inquirer
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Agnes2135#',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

  inquirer.prompt({
    type: 'list',
    name: 'options',
    message: 'Weclome to the Employee DB, please select from the below to begin!',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
  })