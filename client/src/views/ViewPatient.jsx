//header to read {patient name} details import {useState, useEffect } from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header.jsx'


const ViewPatient = (props) => {
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

    const deleteHandler=()=>{
        axios.delete(`http://localhost:9999/api/${id}`)
        .then((res)=>{
            console.log(res.data);
            navigate("/");
        })
    }

    const handleUpdateClick=()=>{
        navigate(`/${id}/update`);
    }

    return (
        <>
        <Header pageTitle={`${patient.name} details`} customButtonName="Update" customButtonLink={`/${id}/edit`}/>
        <div className="patient-card-container">
            <div className="patient-card">
        
        <h3>{patient.age} years of age.</h3>
        <h3>Symptoms:</h3><h5>{patient.symptoms}</h5>
        <div><button onClick={(e)=>deleteHandler(patient._id)}>Discharge patient</button></div>
        </div>
        </div>
        </>
    )
}

export default ViewPatient;

