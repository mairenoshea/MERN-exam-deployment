import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const PatientForm = (props) => {

    const {onAdmit}=props;
    const navigate=useNavigate();
    const {id}= useParams();
    
    const [patientName, setPatientName]=useState('');
    const [patientAge, setPatientAge]=useState();
    const [symptoms, setSymptoms]=useState('');
    
    const [errors, setErrors]=useState({});
    
    if(props.updateMode){
        useEffect(()=>{
            axios.get(`http://localhost:9999/api/${id}`) 
            .then((res)=>{
                console.log(res.data);
                setPatientName(res.data.name);
                setPatientAge(res.data.age);
                setSymptoms(res.data.symptoms);
                console.log(patientName);
            })
            .catch((err)=>{
                console.log(err);
            });
        }, []);
    }
    
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(patientName, patientAge, symptoms);
        axios.post("http://localhost:9999/api",{
        "name":patientName,
        "age":patientAge,
        "symptoms":symptoms
    })
    .then((res)=>{
        console.log(res.data);
        onAdmit();
        navigate(`/patients`);
    })
    .catch((err)=>{
        setErrors(err.response.data.errors);
    })
}

const updateSubmitHandler=(e)=>{
    e.preventDefault();
    console.log(patientName, patientAge, symptoms);
    axios.put(`http://localhost:9999/api/${id}`,{
    "name":patientName,
    "age":patientAge,
    "symptoms":symptoms
})
.then((res)=>{
    console.log(res.data);
    navigate(`/${id}/details`);
})
.catch((err)=>{
    setErrors(err.response.data.errors);
})
}

const [formErrors, setFormErrors]=useState({});


const patientNameHandler=(e)=>{
    setPatientName(e.target.value);
    const value=e.target.value.trim();
    let errorMsg='';
    if (value) {
        if (value.length < 1) {
            errorMsg = 'Name must be at least 1 character long!';
        } else if (value.length > 40) {
            errorMsg = 'Name must be less than 40 characters long';
        }
    } else {
        errorMsg = "Patient's name is required!";
    }
    setFormErrors({ ...formErrors, patientName: errorMsg });
}
const patientAgeHandler = (e) => {
    setPatientAge(e.target.value);
    const value = e.target.value;
    let errorMsg = '';
    if (value <1) {
        errorMsg = 'Patient must be at least 1 year old';
    }
    else {
        errorMsg = '';
    }
    setFormErrors({ ...formErrors, patientAge: errorMsg });
}
const symptomsHandler=(e)=>{
    setSymptoms(e.target.value);
    const value=e.target.value.trim();
    let errorMsg='';
    if (value) {
        if (value.length < 4) {
            errorMsg = 'Symptoms must be at least 4 characters long!';
        }
    } else {
        errorMsg = 'Symptoms are required!';
    }
    setFormErrors({ ...formErrors, symptoms: errorMsg });
}


const validateForm = () => {
    return Object.values(formErrors).every(value => value === '');
}

return (
    <>
    {props.updateMode ? 
        
        (<div className="patient-card-container">
        <form onSubmit={updateSubmitHandler}>
        <div className="form-row">
    <div><label>Age:</label></div>
    <div>{errors.age ? <p className="error">{errors.age.message}</p>:null}</div>
    <div><input type="number" onChange={patientAgeHandler} value={patientAge}></input></div>
    <div>{formErrors.patientAge ? <p style={{color:"purple"}}>{formErrors.patientAge}</p>:null}</div>
    </div>

    <div className="form-row">
    <div><label className="flex-1">Name: </label></div>
    <div>{errors.name ? <p className="error">{errors.name.message}</p>:null}</div>
    <div><input type="text" className="flex-2" onChange={patientNameHandler} value={patientName}></input></div>
   
    <div>{formErrors.patientName ? <p style={{color:"purple"}}>{formErrors.patientName}</p>:null}</div>
    </div>
    
    <div className="form-row">
    <div><label className="flex-1">Symptoms: </label></div>
    <div>{errors.symptoms ? <p className="error">{errors.symptoms.message}</p>:null}</div>
    <div><input type="text" className="flex-2" onChange={symptomsHandler} value={symptoms}></input></div>
    <div>{formErrors.symptoms ? <p style={{color:"purple"}}>{formErrors.symptoms}</p>:null}</div>
    </div>
    
    <div className="form-row">
    <button type="submit" disabled={!validateForm()}>Update Patient</button>
    </div>
        </form></div>
    ): 
    (<div className="book-card-container">

    <form onSubmit={submitHandler}>

    <div className="form-row">
    <div><label>Age:</label></div>
    <div>{errors.age ? <p className="error">{errors.age.message}</p>:null}</div>
    <div><input type="number" onChange={patientAgeHandler} value={patientAge}></input></div>
    <div>{formErrors.patientAge ? <p style={{color:"purple"}}>{formErrors.patientAge}</p>:null}</div>
    </div>

    <div className="form-row">
    <div><label className="flex-1">Name: </label></div>
    <div>{errors.name ? <p className="error">{errors.name.message}</p>:null}</div>
    <div><input type="text" className="flex-2" onChange={patientNameHandler} value={patientName}></input></div>
   
    <div>{formErrors.patientName ? <p style={{color:"purple"}}>{formErrors.patientName}</p>:null}</div>
    </div>
    
    <div className="form-row">
    <div><label className="flex-1">Symptoms: </label></div>
    <div>{errors.symptoms ? <p className="error">{errors.symptoms.message}</p>:null}</div>
    <div><input type="text" className="flex-2" onChange={symptomsHandler} value={symptoms}></input></div>
    <div>{formErrors.symptoms ? <p style={{color:"purple"}}>{formErrors.symptoms}</p>:null}</div>
    </div>
    
    <div className="form-row">
    <button type="submit" disabled={!validateForm()}>Admit Patient</button>
    </div>
    </form></div>
)}
</>
)
}

export default PatientForm;