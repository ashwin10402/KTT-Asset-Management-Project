module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("Employee", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        date_of_birth: {
            type: DataTypes.DATEONLY
        },
        department: {
            type: DataTypes.STRING(100)
        },
        position: {
            type: DataTypes.STRING(100)
        },
        salary: {
            type: DataTypes.DECIMAL(10, 2)
        },
        hire_date: {
            type: DataTypes.DATEONLY
        },
        address: {
            type: DataTypes.STRING(255)
        },
        city: {
            type: DataTypes.STRING(100)
        },
        state: {
            type: DataTypes.STRING(50)
        },
        country: {
            type: DataTypes.STRING(100)
        },
        postal_code: {
            type: DataTypes.STRING(20)
        },
        phone: {
            type: DataTypes.STRING(20)
        }
    }, {
        
       
        tableName: 'employees', 
        timestamps: false       
    });

    Employee.sync();

    return Employee;
};
