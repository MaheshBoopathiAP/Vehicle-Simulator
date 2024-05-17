import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrash,faPencilAlt , faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AllScenarios = () => {
  const [scenarios, setScenarios] = useState([]);
  const [vehicleCounts, setVehicleCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScenarios = async () => {
      // const result = await axios.get('http://localhost:5000/scenarios');
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/scenarios`);
      setScenarios(result.data);
      fetchVehicleCounts(result.data);
    };
    fetchScenarios();
  }, []);

  const fetchVehicleCounts = async (scenarios) => {
    const counts = {};
    for (const scenario of scenarios) {
      // const result = await axios.get(`http://localhost:5000/vehicles?scenarioId=${scenario.id}`);
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/vehicles?scenarioId=${scenario.id}`);
      counts[scenario.id] = result.data.length;
    }
    setVehicleCounts(counts);
  };

  const handleEdit = (id) => {
    navigate(`/edit-scenario/${id}`);
  };

  const handleDelete = async (id) => {
    // Handle delete action
    console.log('Delete scenario with ID:', id);
    // Perform axios delete request
    // await axios.delete(`http://localhost:5000/scenarios/${id}`);
    await axios.delete(`${process.env.REACT_APP_API_URL}/scenarios/${id}`);
    // Refetch scenarios after deletion
    const updatedScenarios = scenarios.filter(scenario => scenario.id !== id);
    setScenarios(updatedScenarios);
  };

  const handleAddVehicle = (id) => {
    navigate(`/add-vehicle/${id}`);
  };


  return (
    <div className='scenario-list'>
      <div className="all-scenario-top">
        <div>
        <h2>All Scenarios</h2>
        </div>
        <div className='buttons'>
        <button className='add-scenario' onClick={() => window.location.href = '/add-scenario'}>New Scenario</button>
        <button className='add-vehicle' onClick={() => window.location.href = '/add-scenario'}>Add Vehicle</button>
        <button className='deleteall' onClick={() => window.location.href = '/add-scenario'}>Delete All</button>

      </div>
      </div>
      <table className='table'>
        <thead className='table-head'>
          <tr>
            <th>Scenario ID</th>
            <th>Scenario Name</th>
            <th>Scenario Time</th>
            <th>Number of Vehicles</th>
            <th>Add Vehicle</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className='table-body'>
          {scenarios.map(scenario => (
            <tr key={scenario.id}>
              <td>{scenario.id}</td>
              <td>{scenario.name}</td>
              <td>{scenario.time}</td>
              <td>{vehicleCounts[scenario.id]}</td>
              <td>
                <button onClick={() => handleAddVehicle(scenario.id)}>
                  <FontAwesomeIcon icon={faPlusCircle} className='add' />
                </button>
                </td>
              {/* <td>
                <button>
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
                </td> */}
              <td>
                <button onClick={() => handleEdit(scenario.id)}>
                  <FontAwesomeIcon icon={faPencilAlt } className='edit'/>
                </button>
                </td>
              <td>
                <button onClick={() => handleDelete(scenario.id)}>
                  <FontAwesomeIcon icon={faTrash} className='delete' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllScenarios;
