
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import AdmitPatient from './views/AdmitPatient';
import ViewAllPatients from './views/ViewAllPatients';
import ViewPatient from './views/ViewPatient';
import UpdatePatient from './views/UpdatePatient';

function App() {
  

  return (
    <>
      <div className="container">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdmitPatient />} />
        <Route path="/patients" element={<ViewAllPatients />} />
        <Route path="/:id/details" element={<ViewPatient />} />
        <Route path="/:id/edit" element={<UpdatePatient />} />
      </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
