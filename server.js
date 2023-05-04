// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bcmedj188sql#',
  database: 'store'
});

// Description, Table of Contents, Installation, Usage, License, Contributing, Tests,
/*
{
  type: "input",
  name: "title",
  message: "What is the title of your project?"
},
*/

const questions = [{
  type: "list",
  choices: ["view all departments", "view all roles",
    "view all employees", "add a department",
    "add a role", "add an employee", "update an employee role"],
  name: "select",
  message: "What would you like to do?"
},
{
  type: "list",
  choices: ["view all departments", "view all roles",
    "view all employees", "add a department",
    "add a role", "add an employee", "update an employee role"],
  name: "select",
  message: "What would you like to do?"
},

];

function askQ() {
  inquirer
    .prompt(questions)
    .then((answers) => {


      if (answers.select == "view all departments") {
        /** */
        connection.query(
          'SELECT * FROM `department`',
          function (err, results) {
            console.log(`\n\nid  department \n==  ==========`)
            results.map(r => {
              console.log(`${r.id}   ${r.name}`)

            })
            console.log(`\n\n`)
            askQ();
            //console.log(fields); // fields contains extra meta data about results, if available
          }
        );



      }


      if (answers.select == "view all roles") {
        
        /** */
        connection.query(
          'SELECT * FROM `role`',
          function (err, results) {
            //console.log(results); // results contains rows returned by server
            console.log(`\n\nid\ttitle\t\t\tdepartment      salary\n==\t======\t\t\t==========  =======`)
            results.map(r => {
              console.log(`${r.id}\t${r.title}\t\t\t${r.department_id}  ${r.salary}`)
              // console.log(fields); // fields contains extra meta data about results, if available
            })
              console.log(`\n\n`)
            askQ();
          }
        );

      }

      if (answers.select == "add a department") {

        let query = ""
        inquirer
          .prompt({
            type: "input",
            name: "dept",
            message: "What is the name of the department?"
          })
          .then((answers) => {

            query = `INSERT INTO department (id,name) VALUES (NULL, '${answers.dept}');`

            connection.query(query,
              function (err, results, fields) {
                if (results.affectedRows > 0) {
                  console.log("Department Added!")
                }
                askQ();
              }
            );

          })


      }

      if (answers.select == "add a role") {

        let query = ""
        inquirer
          .prompt([{
            type: "input",
            name: "role",
            message: "What role do you want to add?"
          },
          {
            type: "input",
            name: "salary",
            message: "What is your salary?"
          },
          {
            type: "input",
            name: "dept",
            message: "What is the department id?"
          }]



          )
          .then((answers) => {

            query = `INSERT INTO role (id, title, salary, department_id) VALUES (NULL,'${answers.role}',${answers.salary},${answers.dept});`

            connection.query(query,
              function (err, results, fields) {
                if (results.affectedRows > 0) {
                  console.log("Role Added!")
                }
                askQ();
              }
            ); //conn

          }) //end of then

      };//end of role

      if (answers.select == "add an employee") {

        let query = ""
        inquirer
          .prompt([{
            type: "input",
            name: "fname",
            message: "what is your name?"
          },
          {
            type: "input",
            name: "lname",
            message: "What is your last name?"
          },
          {
            type: "input",
            name: "role",
            message: "What is the role id?"
          },
          {
            type: "input",
            name: "manager",
            message: "What is your manager id?"
          }]



          )
          .then((answers) => {
           

            query = `INSERT INTO employee (id, first_name , last_name, role_id, manager_id) VALUES 
            (NULL,'${answers.fname}','${answers.lname}',${answers.role},${answers.manager});`

            connection.query(query,
              function (err, results, fields) {
                if (results.affectedRows > 0) {
                  console.log("employee Added!")
                }
                askQ();
              }
            ); //conn

          }) //end of then

      };//end of role
      if (answers.select == "view all employees") {
        
        /** */
        connection.query(
          `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_id  
          FROM employee LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id`,
          function (err, results) {
            //console.log(results); // results contains rows returned by server
             // console.log("what are my keys?", results)

            console.log(`\n\nid\tfirst\tlast\trole    \tsalary\tdept \tmanager`)
            console.log(`==\t======\t======\t=========\t======\t====== \t=====`)
            results.map(r => {
              let m = undefined;
              if(r.manager_id == 1){
                m = "John Smith"
              }
              else if(r.manager_id == 2){
                m = "bob joe"
              }

              console.log(`${r.id}\t${r.first_name}\t${r.last_name}\t${r.title}\t${r.salary}\t${r.name}\t${m}`)
              // console.log(fields); // fields contains extra meta data about results, if available
            })
              console.log(`\n\n`)
            askQ();
          }
        );

      }
      if (answers.select == "update an employee role") {

        let query = ""
        inquirer
          .prompt([{
            type: "input",
            name: "employee_id",
            message: "Which employee?"
          },
          {
            type: "input",
            name: "role_id",
            message: "New role"
          },
          ]



          )
          .then((answers) => {
           

            query = `UPDATE employee SET role_id = ${answers.role_id} WHERE ID = ${answers.employee_id}`

            connection.query(query,
              function (err, results, fields) {
                if (results.affectedRows > 0) {
                  console.log("employee Updated!")
                }
                askQ();
              }
            ); //conn

          }) //end of then

      };//end of role



      /** */




      //insert departments blah blah
      //mysql inserts









      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
      console.log(error);
    });
}

// TODO: Create a function to initialize app
function init() {
  //console.log("start");
  askQ();




}

// Function call to initialize app
init();


