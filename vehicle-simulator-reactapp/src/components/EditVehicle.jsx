import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateVehicle } from '../services/vehicleService';
const EditVehicle = () => {
  const location = useLocation();
  const vehicle = location.state?.vehicle;

  const [name, setName] = useState('');
  const [initialPositionX, setInitialPositionX] = useState('');
  const [initialPositionY, setInitialPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [direction, setDirection] = useState('');
  const [warningX, setWarningX] = useState('');
  const [warningY, setWarningY] = useState('');

  useEffect(() => {
    setName(vehicle.name);
    setInitialPositionX(vehicle.initialPositionX);
    setInitialPositionY(vehicle.initialPositionY);
    setSpeed(vehicle.speed);
    setDirection(vehicle.direction);
  }, [vehicle]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (warningX || warningY) {
      return;
    }
    const editedVehicle = {
      ...vehicle,
      name,
      initialPositionX: parseInt(initialPositionX),
      initialPositionY: parseInt(initialPositionY),
      speed: parseInt(speed),
      direction,
    };
    try {
      await updateVehicle(vehicle.id, editedVehicle);
      alert('Vehicle details updated successfully.');
      window.history.back();
    } catch (error) {
      alert('Failed to update vehicle details: ' + error.message);
    }
  };

  const handlePositionXChange = (e) => {
    const value = e.target.value;
    setInitialPositionX(value);
    if (value > 600 || value < 0) {
      setWarningX('Position X should not be > 600 and < 0');
    } else {
      setWarningX('');
    }
  };

  const handlePositionYChange = (e) => {
    const value = e.target.value;
    setInitialPositionY(value);
    if (value > 400 || value < 0) {
      setWarningY('Position Y should not be > 400 and < 0');
    } else {
      setWarningY('');
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setName('');
    setInitialPositionX('');
    setInitialPositionY('');
    setSpeed('');
    setDirection('');
    setWarningX('');
    setWarningY('');
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className='edit-vehicle'>
      <h1>Edit Vehicle</h1>
      <form onSubmit={handleEditSubmit} >
        <div className="edit-vehicle-form">
          <div className="first-row-inputs">
            <div className="inpt">
              <label>Vehicle Name: </label>
              <input
                className='input-field'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="inpt">
              <label>Position X: </label>
              <input
                className='input-field'
                type="number"
                value={initialPositionX}
                onChange={handlePositionXChange} />

            </div>
            <div className="inpt">
              <label>Position Y: </label>
              <input
                className='input-field'
                type="number"
                value={initialPositionY}
                onChange={handlePositionYChange} />
            </div>
          </div>
          <div className="second-row-inputs">
            <div className="inpt">
              <label>Speed: </label>
              <input className='input-field' type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} />
            </div>
            <div className="inpt">
              <label>Direction: </label>
              <select className='input-field' value={direction} onChange={(e) => setDirection(e.target.value)}>
                <option value="Towards">Towards</option>
                <option value="Backwards">Backwards</option>
                <option value="Upwards">Upwards</option>
                <option value="Downwards">Downwards</option>
              </select>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button className='add' type="submit">Submit</button>
          <button className='reset' onClick={handleReset} >Reset</button>
          <button className='back' onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditVehicle;
