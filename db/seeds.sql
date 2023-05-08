INSERT INTO department (name)
VALUES ( "Sales"),
       ( "marketing"),
       ( "Finance");


INSERT INTO role (title, salary, department_id)
VALUES ("Manager","100000",2),
        ("Coordinator", "80000", 1),
        ("Junior", "60000", 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Adam", "Shalala",1, NULL),
        ("Jane", "Doe", 2, 1),
        ("Nicholas", "Davidson", 3, 2);