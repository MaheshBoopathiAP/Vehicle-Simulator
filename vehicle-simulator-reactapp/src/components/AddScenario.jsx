import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddScenario = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const location = useLocation(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newScenario = { name, time: parseInt(time) };
    await axios.post(`${process.env.REACT_APP_API_URL}/scenarios`, newScenario);
    setName('');
    setTime('');
    toast.success('Scenario added successfully');
  };

  const handleReset = () => {
    setName('');
    setTime('');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className='add-scenario'>
    <ToastContainer />
      <h4 className='page-label'>{location.pathname}</h4>
      <h1>Add Scenario</h1>

      <form onSubmit={handleSubmit} className='add-scenario'>
        <div className="scenario-form">
          <div className="inpt">
            <label>Scenario Name</label>
            <input
              type="text"
              placeholder="Scenario Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='input-field'
            />
          </div>
          <div className="inpt">
            <label>Scenario Time (Seconds)</label>
            <input
              type="number"
              placeholder="Time (seconds)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className='input-field'
            />
          </div>
        </div>

        <div className="buttons">
          <button type="submit" className='add'>Add</button>
          <button type="button" className='reset' onClick={handleReset}>Reset</button>
          <button type="button" className='back' onClick={handleGoBack}>Go Back</button>
        </div>
      </form>
    </div>
  );
};

export default AddScenario;
