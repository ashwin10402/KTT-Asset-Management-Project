module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Employee
    router.post("/", employees.create);
  
    // Retrieve all Employees
    router.get("/", employees.findAll);

    // Update an Employee by id
    router.put("/:id", employees.update);


  
    app.use('/api/employees', router);
  };
  