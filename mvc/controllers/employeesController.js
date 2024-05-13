const data = {
    employees: require("../model/employees.json"),
    setEmployee: function (data) {
        this.employees = data
    }
};

// const getAllEmployees = async  ( (req, res) => {})
const getAllEmployees = (req, res) => {
    res.json(data.employees)
}

const createNewEmployee = (req, res) => {
    const newEmployees = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: "Tutor"
    }

    if (!newEmployees.firstname || !newEmployees.lastname) {
        return res.status(400).json({"message": "First and last name is required! Thank you😊"})
    }

    data.setEmployee([...data.employees, newEmployees])
    res.json(newEmployees)
}



const updateEmployee = (req, res) => {

    const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id))

    if(!employee) {
        return res.status(400).json({"message": `Employee with the ID: ${req.body.id} is not found`})
    }

    if(req.body.firstname) employee.firstname = req.body.firstname;
    if(req.body.lastanme) employee.lastname = req.body.lastname;
    if(req.body.role) employee.role = req.body.role;
    

    const filteredEmployee = data.employees.filter((emp) => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredEmployee, employee]

    data.setEmployee(unsortedArray.sort(( a,b) => (a.id > b.id ? 1 : a.id < b.id ? 1 : 0)))

    res.json(data.employees)
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id))

    if(!employee) {
        return res.status(400).json({message: `Employee with the ID: ${req.body.id} is not found`})
    }

    const filteredEmployee = data.employees.filter((emp) => emp.id !== parseInt(req.body.id));

    data.setEmployee([...filteredEmployee]);
    res.json(data.employees)
}

const getEmployee =  (req, res) => {
   const employee = data.employees.find((emp) => emp.id === parseInt(req.params.id))

    if(!employee) {
        return res
        .status(400)
        .json({"message": `Employee with the ID: ${req.params.id} is not found`})
    }
    res.json(employee)

}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
}