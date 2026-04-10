//#1 Array de funciones
const employeeController = {};

//Import de la coleccion
import employeeModel from "../models/employees.js"

//SELECT
employeeController.getEmployees = async (req, res) => {

    try {
        const employees = await employeeModel.find().populate("idBranches", "name address");
        res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json({ status: "Internal server error", message: error })
    }

};


//ELIMINAR
employeeController.deleteEmployee = async (req, res) => {

    try {
        const deleteEmployee = await employeeModel.findByIdAndDelete(req.params.id)
        if (!deleteEmployee) {
            return res.status(404).json({ status: "Not Found", message: "The employee you wanted to delete was not found" });
        }
        return res.status(200).json({ status: "success", message: "The employee was deleted" })
    } catch (error) {
        return res.status(500).json({ status: "Internal Server Error", message: error })
    }
}

//UPDATE
employeeController.updateEmployee = async (req, res) => {

    try {
        //Solicitamos los nuevos datos 
        const { name, lastName, salary, DUI, phone, email, password, idBranches } = req.body;

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
                isVerified,
                idBranches
            },
            { new: true }
        );

        res.status(200).json({ message: "Employee updated" })
    } catch (error) {
        return res.status(500).json({status: "Internal Server Error", message: error})
    }

}

export default employeeController;