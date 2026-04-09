import customer from "../models/customer.js";
import customerModel from "../models/customer.js"

const customerController = {};

//SELECT
customerController.getCustomers = async (req, res) => {
    try {
        const customers = await customerModel.find();
        return res.status(200).json(customers)
    }
    catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({status:"Internal server error", message: error })
    }
}

//DELETE
customerController.deleteCustomers = async (req, res) => {
    try {
        const deletedCustomer = await customerModel.findByIdAndDelete(req.params.id)
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" })
        }

        return res.status(200).json({ message: "The customer was deleted" })
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({status:"Internal server error", message: error })
    }
}

//UPDATE
customerController.updateCustomer = async (req, res) => {
    try {
        //Solicitamos datos
        let {
            name,
            lastName,
            birthdate,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body

        //Sanitizamos
        name = name?.trim();
        email = email?.trim();

        //Validamos tamaño de nombre
        if (name.lenght < 3 || name.lenght > 15) {
            return res.status(400).json({ status: "error", message: "The name is too short or too long" })
        }

        //Actualizamos
        const updatedCustomer = await customerModel.findByIdAndUpdate(req.params.id,
            {
                name,
                lastName,
                birthdate,
                email,
                password,
                isVerified,
                loginAttempts,
                timeOut
            }, {new: true}
        )

        if(!updatedCustomer){
            return res.status(404).json({status: "error", message: "Customer not found"})
        }

        return res.status(200).json({status: "success", message: "The customer was updated"})

    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({status:"Internal server error", message: error })
    }
}

export default customerController;