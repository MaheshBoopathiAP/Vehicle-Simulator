import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllScenarios } from '../services/scenarioService';
import { createVehicle } from '../services/vehicleService';

const AddVehicle = () => {
  const [scenarios, setScenarios] = useState([]);
  const [scenarioId, setScenarioId] = useState('');
  const [name, setName] = useState('');
  const [initialPositionX, setInitialPositionX] = useState('');
  const [initialPositionY, setInitialPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [direction, setDirection] = useState('');
  const [warningX, setWarningX] = useState('');
  const [warningY, setWarningY] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const result = await getAllScenarios();
        setScenarios(result);
      } catch (error) {
        toast.error("Failed to fetch scenarios");
      }
    };
    fetchScenarios();
  }, []);

  const handlePositionXChange = (e) => {
    const value = e.target.value;
    setInitialPositionX(value);
    if (value > 1050 || value < 0) {
      setWarningX('Position X should not be > 1050 and < 0');
    } else {
      setWarningX('');
    }
  };

  const handlePositionYChange = (e) => {
    const value = e.target.value;
    setInitialPositionY(value);
    if (value > 450 || value < 0) {
      setWarningY('Position Y should not be > 450 and < 0');
    } else {
      setWarningY('');
    }
  };

  const handleScenarioChange = (e) => {
    const value = e.target.value;
    setScenarioId(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (warningX || warningY) {
      return;
    }

    if (!scenarioId) {
      toast.error('Invalid scenario ID');
      return;
    }

    const newVehicle = {
      name,
      initialPositionX: parseInt(initialPositionX, 10),
      initialPositionY: parseInt(initialPositionY, 10),
      speed: parseInt(speed, 10),
      direction,
      scenarioId,
    };

    try {
      await createVehicle(newVehicle);
      setScenarioId('');
      setName('');
      setInitialPositionX('');
      setInitialPositionY('');
      setSpeed('');
      setDirection('');
      toast.success('Vehicle added successfully');
    } catch (error) {
      toast.error("Failed to add vehicle");
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setScenarioId('');
    setName('');
    setInitialPositionX('');
    setInitialPositionY('');
    setSpeed('');
    setDirection('');
    setWarningX('');
    setWarningY('');
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <div className='add-vehicle'>
      <ToastContainer />
      <h4 className='page-label'>{location.pathname}</h4>
      <h1>Add Vehicle</h1>
      <form onSubmit={handleSubmit} className='add-vehicle'>
        <div className="vehicle-form">
          <div className="first-row-inputs">
            <div className="inpt">
              <label>Scenario</label>
              <select
                value={scenarioId}
                onChange={handleScenarioChange}
                required
                className='input-field-select'
              >
                <option value="">Select Scenario</option>
                {scenarios.map(scenario => (
                  <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
                ))}
              </select>
            </div>
            <div className="inpt">
              <label>Vehicle Name</label>
              <input
                type="text"
                placeholder="Vehicle Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='input-field'
              />
            </div>
            <div className="inpt">
              <label>Position X</label>
              <input
                type="number"
                placeholder="Initial Position X"
                value={initialPositionX}
                onChange={handlePositionXChange}
                required
                className={`input-field ${warningX ? 'input-warning' : ''}`}
              />
              {warningX && <div className='warning'>{warningX}</div>}
            </div>
          </div>
          <div className="second-row-inputs">
            <div className="inpt">
              <label>Position Y</label>
              <input
                type="number"
                placeholder="Initial Position Y"
                value={initialPositionY}
                onChange={handlePositionYChange}
                required
                className={`input-field ${warningY ? 'input-warning' : ''}`}
              />
              {warningY && <div className='warning'>{warningY}</div>}
            </div>
            <div className="inpt">
              <label>Speed</label>
              <input
                type="number"
                placeholder="Speed"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                required
                className='input-field'
              />
            </div>
            <div className="inpt">
              <label>Direction</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                required
                className='input-field-select'
              >
                <option value="">Select Direction</option>
                <option value="Towards">Towards</option>
                <option value="Backwards">Backwards</option>
                <option value="Upwards">Upwards</option>
                <option value="Downwards">Downwards</option>
              </select>
            </div>
          </div>
        </div>
        <div className='buttons'>
          <button className='add' type="submit">Add</button>
          <button className='reset' onClick={handleReset}>Reset</button>
          <button className='back' onClick={handleGoBack}>Go Back</button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;
