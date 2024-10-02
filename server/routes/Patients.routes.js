import {getAllPatients, getOnePatient, deleteOnePatient, updateOnePatient, createPatient, getPatientsUnder18, getPatientsOver18} from '../controllers/Patients.controller.js';
import { Router } from 'express';

const router=Router();

router.route("/patients")
//for displaying all the patients in the hospital manager
    .get(getAllPatients)
//for sending the post request when the 'admit patient' form is submitted from this page
    .post(createPatient);
router.route("/")
//for displaying how many current patients there are on the 'admit patient' landing screen
    .get(getAllPatients)
//for sending the post request when the 'admit patient' form is submitted
    .post(createPatient);
router.route("/patients/under18")
//for displaying the filtered patients in the hospital manager
    .get(getPatientsUnder18)
router.route("/patients/over18")
//for displaying the filtered patients in the hospital manager
    .get(getPatientsOver18)
router.route("/:id")
    .get(getOnePatient)
    .put(updateOnePatient)
    .delete(deleteOnePatient);

export default router;

