const inquirer = require("inquirer");
const mysql = require("mysql");
const app = require("../app");
const view = require("./view");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Kenndall2017!",
    database: "employee_db"
});

exports.addEmployee = () => {
    view.getAllRoles(function(rolesResults) {
        var roles = [];
        for (var i = 0; i < rolesResults.length; i++) {
            roles.push(rolesResults[i].title);
        }
        var options = [
            {
                type: "input",
                message: "Employee First Name",
                name: "firstName",
                default: "Henry"
            },
            {
                type: "input",
                message: "Employee Last Name",
                name: "lastName",
                default: "Simpson"
            },
            {
                type: "input",
                message: "Employee Role",
                name: "role",
                choices: roles
            }
        ];

        inquirer.prompt(options)
            .then((answers) => {
                var roleId = null;
                for (var i = 0; i < rolesResults.length; i++) {
                //    console.log(rolesResults[i]);
                // console.log(answers.role)
                console.log (rolesResults[i].Role_id == answers.role)
                if (rolesResults[i].Role_id == answers.role) {
                        roleId = rolesResults[i].Role_id
                        
                    }
                }
                console.log(roleId)
                connection.query("INSERT INTO employees SET ?",
                    {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        emp_role_id: roleId
                    },
                    function (err, results) {
                        if (err) throw err;
                        console.log("Successful" + answers.firstName + "" + answers.lastName);
                        app.start();
                    });
            });
    });
};
