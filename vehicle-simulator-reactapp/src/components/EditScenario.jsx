import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditScenario = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/scenarios/${id}`);
        setName(response.data.name);
        setTime(response.data.time);
      } catch (error) {
        console.error('Error fetching scenario:', error);
        toast.error('Failed to fetch scenario');
      }
    };
    fetchScenario();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedScenario = { name, time: parseInt(time) };
    await axios.put(`${process.env.REACT_APP_API_URL}/scenarios/${id}`, updatedScenario);
    toast.success('Scenario updated successfully');
    setName('');
    setTime('');
   
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleReset = () => {
    setName('');
    setTime('');
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className='edit-scenario'>
      <ToastContainer />
      <h4 className='page-label'>{location.pathname}</h4>
      <h1>Edit Scenario</h1>

      <form onSubmit={handleSubmit} className='edit-scenario'>
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
          <button type="submit" className='add'>Save</button>
          <button type="button" className='reset' onClick={handleReset}>Reset</button>
          <button type="button" className='back' onClick={handleGoBack}>Go Back</button>
        </div>
      </form>
    </div>
  );
};

export default EditScenario;
