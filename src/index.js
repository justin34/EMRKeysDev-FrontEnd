import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './HomePage/App';
import Login from './LoginScreen/Login'
import PatientList from "./PatientList/Patients";
import PatientForm from "./PatientList/PatientForm";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="*" element={<Login />}/>
              <Route path="/home/:userId" element={<App />}/>
              <Route path="/home/:userId/patients" element={<PatientList />}/>
              <Route path="/patients/:userId/:patientId/" element={<PatientForm/>}/>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
