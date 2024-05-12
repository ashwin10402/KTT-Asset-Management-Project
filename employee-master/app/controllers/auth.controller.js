const db = require('../models'); 
const Employee = db.employees;

exports.login = async (req, res) => {
    const { userId, password } = req.body;

    try {
        const employee = await Employee.findByPk(userId);
        if (!employee) {
            return res.status(404).send({
                message: `Employee not found with id ${userId}`
            });
        }

        if (employee && employee.phone == password) {
            // Set session variables
            req.session.employee = {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                isActive: employee.is_active,
                department: employee.department,
                position: employee.position
            };
            res.redirect('/main');
        } else {
            res.status(401).send("Invalid user ID or password");
        }
    } catch (error) {
        res.status(500).send("Error logging in");
    }
};
