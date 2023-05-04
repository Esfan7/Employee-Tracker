CREATE DATABASE store_db;

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(30)
);

CREATE TABLE role(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);


INSERT INTO department (id, name) VALUES (NULL,'human resources');
INSERT INTO role (id, title, department_id, salary) VALUES (NULL,'Sales Lead',3, 55000)
INSERT INTO department (name) VALUES ('IT')
INSERT INTO employee (id, first_name , last_name, role_id, manager_id) VALUES (NULL,'esfan','beh',3, 5);

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name  FROM employee INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id


SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_id  
          FROM employee LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id

UPDATE employee SET first_name = 'Marry', last_name = 'Sue', role_id = 3, manager_id =1 WHERE ID = 1

UPDATE employee SET  role_id = 3 WHERE ID = 1