import Patient from '../models/Patients.model.js';

async function getAllPatients(req,res) {
    try {
        const allPatients=await Patient.find();
        res.json(allPatients);
        console.log(allPatients);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function getOnePatient(req,res) {
    try {
        const foundPatient=await Patient.findById(req.params.id);
        res.json(foundPatient);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function createPatient(req,res) {
    try {
        const newPatient=await Patient.create(req.body);
        console.log(newPatient);
        res.json(newPatient);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function getPatientsUnder18 (req, res) {
    const filter = {
        age: { 
            $lt: 18
        }
    };
    try {
        const allPatients = await Patient.find(filter); 
        res.json(allPatients);
        
    } catch (error) {
        console.log(error);
        res.status(400).json(error); 
    }
}

async function getPatientsOver18(req, res) {
    const filter = {
        age: { 
            $gt: 18
        }
    };
    try {
        const allPatients = await Patient.find(filter); 
        res.json(allPatients);
    } catch (error) {
        console.log(error);
        res.status(400).json(error); 
    }
}



async function updateOnePatient(req,res) {
    const options = {
        new:true, 
        runValidators:true,
    };
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, options);
        res.json(updatedPatient);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
async function deleteOnePatient(req,res) {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        res.json(deletedPatient);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export {getAllPatients, getOnePatient, deleteOnePatient, updateOnePatient, createPatient, getPatientsUnder18, getPatientsOver18}
