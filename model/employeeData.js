const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    employeeName: String,
    employeeDesignation: String,
    employeeLocation: String,
    employeeSalary: Number
});

const employeedata = mongoose.model('employee', employeeSchema);

module.exports = employeedata;
