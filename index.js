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

  const functions = {
    'View all departments': viewDepartments,
    'View all roles': viewRoles,
    'View all employees': viewEmployees,
    'Add a department': addDepartment,
    // 'Add a role': addRole,
    // 'Add an employee': addEmployee,
    // 'Update an employee': updateEmployee
  };
  
  inquirer.prompt({
    type: 'list',
    name: 'option',
    message: 'Welcom to the Employee DB, please select an option:',
    choices: Object.keys(functions)
  }).then((answer) => {
    const func = functions[answer.option];
    func(db);
  });
  
  function viewDepartments(connection) {
    connection.query('SELECT * FROM department', (err, results) => {
      if (err) throw err;
      console.table(results, ['id', 'name']);
      connection.end();
    });
  }

  function viewRoles(connection) {
    connection.query('SELECT * FROM role', (err,results) => {
        if (err) throw err;
        console.table(results);
        connection.end();

    });
  }
  
  function viewEmployees(connection) {
    connection.query('SELECT * FROM employee', (err,results) => {
        if (err) throw err;
        console.table(results);
        connection.end();

    });
  }

  function addDepartment(connection) {
    inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Enter the department ID:'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:'
      }
    ]).then((answer) => {
      connection.query(
        'INSERT INTO department (id, name) VALUES (?, ?)',
        [answer.id, answer.name],
        (err, results) => {
          if (err) throw err;
          console.log(`${answer.name} department added.`);
          connection.end();
        }
      );
    });
  }
  