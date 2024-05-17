import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const EditScenario = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/scenarios/${id}`);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/scenarios/${id}`);
        setName(response.data.name);
        setTime(response.data.time);
      } catch (error) {
        console.error('Error fetching scenario:', error);
      }
    };
    fetchScenario();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const updatedScenario = { name, time: parseInt(time) };
    // await axios.put(`http://localhost:5000/scenarios/${id}`, updatedScenario);
    await axios.put(`${process.env.REACT_APP_API_URL}/scenarios/${id}`, updatedScenario);
    setName('');
    setTime('');
    navigate('/'); // Redirect to home page or another appropriate page after editing
  };

  const handleReset = () => {
    setName('');
    setTime('');
    setSubmitted(false); // Reset the submitted state
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className='edit-scenario'>
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
