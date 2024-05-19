import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getAllScenarios,
  deleteScenario,
  deleteAllScenarios,
} from '../services/scenarioService';
import { getVehiclesByScenarioId } from '../services/vehicleService';

const AllScenarios = () => {
  const [scenarios, setScenarios] = useState([]);
  const [vehicleCounts, setVehicleCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScenarios = async () => {
      const result = await getAllScenarios();
      setScenarios(result);
      fetchVehicleCounts(result);
    };
    fetchScenarios();
  }, []);

  const fetchVehicleCounts = async (scenarios) => {
    const counts = {};
    for (const scenario of scenarios) {
      const result = await getVehiclesByScenarioId(scenario.id);
      counts[scenario.id] = result.length;
    }
    setVehicleCounts(counts);
  };

  const handleEdit = (id) => {
    navigate(`/edit-scenario/${id}`);
  };

  const handleDelete = async (id) => {
    console.log('Delete scenario with ID:', id);
    await deleteScenario(id);
    toast.success('Scenario deleted successfully');
    // Refetch scenarios after deletion
    const updatedScenarios = scenarios.filter(scenario => scenario.id !== id);
    setScenarios(updatedScenarios);
  };

  const handleAddVehicle = (id) => {
    navigate(`/add-vehicle/${id}`);
  };

  const handleAddScenario = () => {
    navigate('/Scenario/add');
  };

  const handleDeleteAll = async () => {
    await deleteAllScenarios();
    setScenarios([]);
    toast.success('All scenarios deleted successfully');
  };

  const handleAddVehicleTop = () => {
    navigate('/Vehicle/add');
  };

  return (
    <div className='scenario-list'>
      <ToastContainer />
      <div className="all-scenario-top">
        <div>
          <h2>All Scenarios</h2>
        </div>
        <div className='buttons'>
          <button className='add-scenario' onClick={handleAddScenario}>New Scenario</button>
          <button className='add-vehicle' onClick={handleAddVehicleTop}>Add Vehicle</button>
          <button className='deleteall' onClick={handleDeleteAll}>Delete All</button>
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
              <td>
                <button onClick={() => handleEdit(scenario.id)}>
                  <FontAwesomeIcon icon={faPencilAlt} className='edit' />
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
