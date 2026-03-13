const branchController = {};

//Import del esquema a utilizar
import branchModel from "../models/branches.js"

//SELECT
branchController.getBranches = async (req, res) =>{
    const branches = await branchModel.find();
    res.json(branches)
}

//POST
branchController.insertBranches = async (req, res) =>{
    const {name, address, schedule, isActive} = req.body
    
    const newBranch = new branchModel({name, address, schedule, isActive})

    await newBranch.save();

    res.json({message: "Branch saved"});
}

//ELIMINAR
branchController.deleteBranches = async (req, res) =>{
    await branchModel.findByIdAndDelete(req.params.id)
    res.json({message: "Branch deleted"})
}

//ACTUALIZAR
branchController.updateBranches = async (req, res) =>{
    const {name, address, schedule, isActive} = req.body;
    await branchModel.findByIdAndUpdate(req.params.id, {
        name,
        address,
        schedule,
        isActive
    }, {new: true})

    res.json({message: "Branch updated"})
}

export default branchController;