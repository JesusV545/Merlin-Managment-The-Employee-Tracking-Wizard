INSERT INTO department (name)
VALUES ('Sales'),
       ('IT'),
       ('Human Resources'),
       ('Marketing'),
       ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Rep', 40000, 1),
       ('IT Tech', 50000, 1),
       ('HR Generalist', 70000, 1),
       ('Sales Lead', 60000, 1),
       ('Lead Engineer', 200000, 1),
       ('Software Engineer', 70000, 1),
       ('Accountant', 100000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jesus', 'Vazquez', 5, 1),
       ('Pedro', 'Guerrero', 2, 1),
       ('Jay', 'Arriaga', 7, 1),
       ('Jerry', 'Gonzalez', 4, 1),
       ('Anthony', 'Morris', 6, 1),
       ('Rolando', 'Olivo', 3, 1),
       ('Derik', 'Jalomo', 2, 1);
       