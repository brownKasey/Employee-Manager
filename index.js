//requirements (─‿─)
const express = require('express');
const db = require('./config/connection');
const inquirer = require("inquirer");

//establishes the app ٩(＾◡＾)۶
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.connect(err => {
    if (err) throw err;
    console.log('connected to the database ٩(＾◡＾)۶');
    console.log(`
    8888888888                     888                                888b     d888                                                
    888                            888                                8888b   d8888                                                
    888                            888                                88888b.d88888                                                
    8888888   88888b.d88b. 88888b. 888 .d88b. 888  888 .d88b.  .d88b. 888Y88888P888 8888b. 88888b.  8888b.  .d88b.  .d88b. 888d888 
    888       888 "888 "88b888 "88b888d88""88b888  888d8P  Y8bd8P  Y8b888 Y888P 888    "88b888 "88b    "88bd88P"88bd8P  Y8b888P"   
    888       888  888  888888  888888888  888888  8888888888888888888888  Y8P  888.d888888888  888.d888888888  88888888888888     
    888       888  888  888888 d88P888Y88..88PY88b 888Y8b.    Y8b.    888   "   888888  888888  888888  888Y88b 888Y8b.    888     
    8888888888888  888  88888888P" 888 "Y88P"  "Y88888 "Y8888  "Y8888 888       888"Y888888888  888"Y888888 "Y88888 "Y8888 888     
                           888                     888                                                          888                
                           888                Y8b d88P                                                     Y8b d88P                
                           888                 "Y88P"                                                       "Y88P"                 
    `);
    init();
});

//function to start the inquirer prompt ໒(＾ᴥ＾)७
let init = function () {
    inquirer.prompt([{
        //asks what you would like to do (─‿─)
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Department', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Log Out']
    }]).then((answers) => {
        //selects the department table （＾ｖ＾）
        if (answers.prompt === 'View All Department') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.table(result);
                init();
            });
        } else if (answers.prompt === 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Roles: ");
                console.table(result);
                init();
            });
        } else if (answers.prompt === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Employees: ");
                console.table(result);
                init();
            });
        } else if (answers.prompt === 'Add A Department') {
            inquirer.prompt([{
                //adds a department to the department table ( ͡° ͜ʖ ͡° )
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please Add A Department!');
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database.`)
                    init();
                });
            })
        } else if (answers.prompt === 'Add A Role') {
            //adds a role to the role table ( ͡° ͜ʖ ͡° )
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        //name of the role ( ͡° ͜ʖ ͡° )
                        type: 'input',
                        name: 'role',
                        message: 'What is the name of the role?',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            } else {
                                console.log('Please Add A Role!');
                                return false;
                            }
                        }
                    },
                    {
                        //amount the salary is ( ͡° ͜ʖ ͡° )
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;
                            } else {
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        //adding the role to a department ( ͡° ͜ʖ ͡° )
                        type: 'list',
                        name: 'department',
                        message: 'Which department does the role belong to?',
                        choices: () => {
                            let array = [];
                            for (let i = 0; i < result.length; i++) {
                                array.push(result[i].name);
                            }
                            return array;
                        }
                    }
                ]).then((answers) => {
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].name === answers.department) {
                            let department = result[i];
                        }
                    }

                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database.`)
                        init();
                    });
                })
            });
        } else if (answers.prompt === 'Add An Employee') {
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        //the new employee's first name (ღ˘⌣˘ღ)
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the employees first name?',
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true;
                            } else {
                                console.log('Please Add A First Name!');
                                return false;
                            }
                        }
                    },
                    {
                        //the new employee's last name (ღ˘⌣˘ღ)
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the employees last name?',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        //the new employee's role 
                        type: 'list',
                        name: 'role',
                        message: 'What is the employees role?',
                        choices: () => {
                            let array = [];
                            for (let i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            let newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        //the new employee's manager (◉‿◉)
                        type: 'input',
                        name: 'manager',
                        message: 'Who is the employees manager?',
                        validate: managerInput => {
                            if (managerInput) {
                                return true;
                            } else {
                                console.log('Please Add A Manager!');
                                return false;
                            }
                        }
                    }
                ]).then((answers) => {
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            let role = result[i];
                        }
                    }

                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
                        init();
                    });
                })
            });
        } else if (answers.prompt === 'Update An Employee Role') {
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        //updates an existing employee info 
                        type: 'list',
                        name: 'employee',
                        message: 'Which employees role do you want to update?',
                        choices: () => {
                            let array = [];
                            for (let i = 0; i < result.length; i++) {
                                array.push(result[i].last_name);
                            }
                            let employeeArray = [...new Set(array)];
                            return employeeArray;
                        }
                    },
                    {
                        //updates their role
                        type: 'list',
                        name: 'role',
                        message: 'What is their new role?',
                        choices: () => {
                            let array = [];
                            for (let i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            let newArray = [...new Set(array)];
                            return newArray;
                        }
                    }
                ]).then((answers) => {
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].last_name === answers.employee) {
                            let name = result[i];
                        }
                    }

                    for (let i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            let role = result[i];
                        }
                    }

                    db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err, result) => {
                        if (err) throw err;
                        console.log(`Updated ${answers.employee} role to the database.`)
                        init();
                    });
                })
            });
        } else if (answers.prompt === 'Log Out') {
            db.end();
            console.log("Bye bye (⋟﹏⋞)");
        }
    })
};