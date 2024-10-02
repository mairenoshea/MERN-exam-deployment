// header to read 'update {patient name}'; 'details' button
import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import PatientForm from '../components/PatientForm.jsx'
import axios from 'axios';
import Patient from '../../../server/models/Patients.model.js';

const UpdatePatient = (props) => {
    const [patient, setPatient]= useState({});
    const {id}= useParams();
    console.log(id);
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get(`http://localhost:9999/api/${id}`) 
        .then((res)=>{
            console.log(res.data);
            setPatient(res.data);
        })
        .catch((err)=>{
            console.log(err);
        });
    },[]);
    
    return (
        <>
        <Header pageTitle={"Update "+patient.name} customButtonName="Details" customButtonLink={`/${patient._id}/details`}/>
        <PatientForm updateMode={true} />
        </>
    )
}

export default UpdatePatient