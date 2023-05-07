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
    'Add a role': addRole,
    'Add an employee': addEmployee,
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
        name: 'name',
        message: 'Enter the name of the department:'
      }
    ]).then((answer) => {
      connection.query(
        'INSERT INTO department (name) VALUES (?)',
        [ answer.name],
        (err, results) => {
          if (err) throw err;
          console.log(`${answer.name} department added.`);
          connection.end();
        }
      );
    });
  }
  
  function addRole(connection) {
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary of the role:'
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for the role:'
      }
    ]).then((answer) => {
      connection.query(
        'INSERT INTO role (id, title, salary, department_id) VALUES (?, ?, ?, ?)',
        [answer.id, answer.title, answer.salary, answer.department_id],
        (err, results) => {
          if (err) throw err;
          console.log(`${answer.title} role added.`);
          connection.end();
        }
      );
    });
  }


  
  function addEmployee(connection) {
    inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter New Employee First Name'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter New Employee Last Name'
      },
      {
        type: 'number',
        name: 'role',
        message: 'Enter New Employee Role ID'
      },
      {
        type: 'number',
        name: 'manager',
        message: 'If there is a manager enter their ID if not just hit enter'
      }
    ]).then((answer) => {
        const managerId = answer.manager ? answer.manager : null;
      connection.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [answer.firstName, answer.lastName, answer.role, managerId],
        (err, results) => {
          if (err) throw err;
          console.log(`${answer.firstName} ${answer.lastName} has been added as a new employee.`);
          connection.end();
        }
      );
    });
  }
