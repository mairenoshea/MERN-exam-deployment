//header to read "Hospital Manager", 'admit' button goes to admit patient route
import Header from '../components/Header.jsx';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PatientForm from '../components/PatientForm.jsx';

const ViewAllPatients = () => {
    const [patients, setPatients] = useState([]);
    const [isSubmitted, setIsSubmitted]=useState(null);
    const navigate=useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:9999/api/patients")
        .then((res)=>{
            setPatients(res.data);
        })
        .catch((err)=>{
            console.log(err);
        });
    },[isSubmitted]);

    const handleFilterUnder18=()=>{
        axios.get(`http://localhost:9999/api/patients/under18`)
        .then((res)=>{
            setPatients(res.data);
            console.log(res.data);
        }).catch((err)=>{console.log(err);});
    }
    const handleFilterOver18=()=>{
        axios.get(`http://localhost:9999/api/patients/over18`)
        .then((res)=>{
            console.log(res.data);
            setPatients(res.data);
        }).catch((err)=>{console.log(err);});
    }
    const handleResetFilter=()=>{
        axios.get("http://localhost:9999/api/patients")
        .then((res)=>{
            setPatients(res.data);
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    const onAdmit=()=>{
        setIsSubmitted(true);
    }
    
    return (
        <>
        <Header pageTitle="Hospital Manager" customButtonName="Admit" customButtonLink={`/`}/>
        <div className="filter-search-bar">
        <h3>Filter:</h3>
            <button onClick={handleFilterUnder18}>Children</button> | 
            <button onClick={handleFilterOver18}>Adults</button> | 
            <button onClick={handleResetFilter}>All Patients</button>
            </div>
        <div className='patient-card-container'>
        {patients.map((patient,index)=>{
            return(
                <div className='patient-card'>
                <h3>
                <Link to={`/${patient._id}/details`}>
                    <button style={{"fontSize":"20px", "border":"none", "color":'blue'}}>{patient.name}</button>
                </Link>
                </h3>
                <Link to={`/${patient._id}/edit`}>
                    <button>edit</button>
                </Link>
                <p style={{"marginTop":"5px", "fontSize":"14px"}}>Age: {patient.age}</p>
                <p style={{"marginTop":"5px", "fontSize":"12px"}}>{patient.symptoms}</p>
                </div>
            )
        })}
        </div>
        <div></div>
        <div className="mini-form">
            <h3 style={{"textAlign":"center"}}>Admit a Patient</h3>
        <PatientForm updateMode={false} onAdmit={onAdmit}/></div>
        
        </>
    )
}

export default ViewAllPatients;