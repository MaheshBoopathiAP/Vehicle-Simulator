import React from 'react';
import { Routes, Route} from "react-router-dom";
import AddScenario from './components/AddScenario';
import AddVehicle from './components/AddVehicle';
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import VehicleList from './components/VehicleList';
import './styles/global.css';
import AllScenarios from './components/AllScenarios';
import EditVehicle from './components/EditVehicle';
import EditScenario from './components/EditScenario';

const App = () => {
  return (
    
      <div className="app">
        <Sidebar />
        <div className="content">
       
      <Routes>
            <Route path="/" exact element={<HomePage/>} />
            <Route path="/Scenario/add" element={<AddScenario/>} />
            <Route path="/Vehicle/add" element={<AddVehicle/>} />
            <Route path="/scenarios" element={<AllScenarios/>} />
            <Route path="/edit-scenario/:id" element={<EditScenario/>} />
            <Route path="/vehicles" element={<VehicleList/>} />
            <Route path="/Add-vehicle/:scenarioId" element={<AddVehicle />} />
            <Route path="edit-vehicle" element={<EditVehicle/>} />

          </Routes>
      
        </div>
      </div>
   
  );
};

export default App;
