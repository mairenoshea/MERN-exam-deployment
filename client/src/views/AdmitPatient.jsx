//header to read 'admit patient'; no additional button
import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import PatientForm from '../components/PatientForm.jsx'
import axios from 'axios';

const AdmitPatient =(props) =>{
    return (
        <>
        <Header pageTitle="Admit Patient" customButton={false}/>
        <div className="mini-form">
        <PatientForm updateMode={false} /></div>
        </>
    )
}

export default AdmitPatient;