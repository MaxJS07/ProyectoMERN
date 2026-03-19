//#1 Array de funciones
const employeeController = {};

//Import de la coleccion
import employeeModel from "../models/employees.js"

//SELECT
employeeController.getEmployees = async (req, res) =>{
    const employees = await employeeModel.find().populate("idBranches", "name address");
    res.json(employees);
};

//INSERT
employeeController.insertEmployees = async (req, res) =>{
    //Solicitamos los datos
    const {name, lastName, salary, DUI, phone, email, password, idBranches} = req.body;

    //Llenamos el modelo con los datos solicitados
    const newEmployee = new employeeModel({
        name,
        lastName,
        salary,
        DUI,
        phone,
        email,
        password,
        idBranches
    })

    //Guardamos el nuevo empleado
    await newEmployee.save();
    
    res.json({message: "Employee saved", data: newEmployee})
}

//ELIMINAR
employeeController.deleteEmployee = async (req, res) =>{
    await employeeModel.findByIdAndDelete(req.params.id)
    res.json({message: "Employee deleted"})
}

//UPDATE
employeeController.updateEmployee = async (req, res) => {
    //Solicitamos los nuevos datos 
    const {name, lastName, salary, DUI, phone, email, password, idBranches} = req.body;

    //Actualizamos
    await employeeModel.findByIdAndUpdate(
        req.params.id,
        {
            name,
            lastName,
            salary,
            DUI,
            phone,
            email,
            password,
            idBranches
        },
        { new: true}
    );

    res.json({message: "Employee updated"})
}

export default employeeController;