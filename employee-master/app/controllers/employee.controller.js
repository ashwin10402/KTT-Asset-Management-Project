const db = require('../models');
const Employee = db.employees;
const Asset = db.assets;

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create an employee object
    const employee = {
        name: req.body.name,
        email: req.body.email,
        is_active: req.body.is_active || true,  // Default to true if not provided
        date_of_birth: req.body.date_of_birth,
        department: req.body.department,
        position: req.body.position,
        salary: req.body.salary,
        hire_date: req.body.hire_date,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        postal_code: req.body.postal_code,
        phone: req.body.phone
    };

    // Save Employee in the database
    try {
        const data = await Employee.create(employee);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Employee."
        });
    }
};



// Fetch all employees
exports.findAll = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);  // Send data as JSON
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving employees."
        });
    }
};



exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).send({
                message: `Employee not found with id ${id}`
            });
        }

        // Update each field with new data from req.body
        
        employee.name = req.body.name;
        employee.email = req.body.email;
        employee.is_active = req.body.is_active;
        employee.date_of_birth = req.body.date_of_birth;
        employee.department = req.body.department;
        employee.position = req.body.position;
        employee.salary = req.body.salary;
        employee.hire_date = req.body.hire_date;
        employee.address = req.body.address;
        employee.city = req.body.city;
        employee.state = req.body.state;
        employee.country = req.body.country;
        employee.postal_code = req.body.postal_code;
        employee.phone = req.body.phone;

        await employee.save();

        res.send({
            message: "Employee updated successfully!",
            data: employee
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while updating the Employee."
        });
    }
};








