import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  faTrash,faPencilAlt , faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [simulationInterval, setSimulationInterval] = useState(null);
  const [scenarioTime, setScenarioTime] = useState(null);
  const navigate = useNavigate(); 
  
  
  // State for editing a vehicle
  const [editVehicle, setEditVehicle] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPositionX, setEditPositionX] = useState('');
  const [editPositionY, setEditPositionY] = useState('');
  const [editSpeed, setEditSpeed] = useState('');
  const [editDirection, setEditDirection] = useState('');
  let counter = 0;


  
  const stopSimulation = () => {
    clearInterval(simulationInterval);
    console.log("Simulation stopped.", counter);
    setSimulationInterval(null);
    console.log(simulationInterval);
    
  };
  

  const startSimulation = () => {

    if(!selectedScenarioId) {
      console.log("Please select a scenario first.");
      return;
    }



    if (simulationInterval!=null) {
      console.log(simulationInterval);
      console.log("Simulation is already running.");
      return;
    }
  
  
  
    const interval = setInterval(() => {
     
      setVehicles(prevVehicles => {
        return prevVehicles.map(vehicle => {
          let newPositionX = vehicle.initialPositionX;
          let newPositionY = vehicle.initialPositionY;
  
          switch (vehicle.direction) {
            case 'Towards':
              newPositionX += vehicle.speed;
              break;
            case 'Backwards':
              newPositionX -= vehicle.speed;
              break;
            case 'Upwards':
              newPositionY -= vehicle.speed;
              break;
            case 'Downwards':
              newPositionY += vehicle.speed;
              break;
            default:
              break;
          }
  
          newPositionX = Math.max(0, Math.min(newPositionX, 600)); // Assuming 600px width
          newPositionY = Math.max(0, Math.min(newPositionY, 400)); // Assuming 400px height
  
          return { ...vehicle, initialPositionX: newPositionX, initialPositionY: newPositionY };
        });
      });
  
      counter++;
      console.log("Simulation running for", counter, "seconds. Scenario time:", scenarioTime, "simulation time" , simulationInterval);
  
      if (counter >= scenarioTime) {
        console.log("Scenario time reached. Stopping simulation.");
        clearInterval(interval);
        setSimulationInterval(null);
        return;
      }
    }, 1000); 
  
    setSimulationInterval(interval);
    console.log("Simulation started.", interval);
  };

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        // const result = await axios.get('http://localhost:5000/scenarios');
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/scenarios`);
        setScenarios(result.data);
      } catch (error) {
        console.error("Error fetching scenarios:", error);
      }
    };
    fetchScenarios();
  }, []);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        // const result = await axios.get('http://localhost:5000/scenarios');
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/scenarios`);
        setScenarios(result.data);
       
        if (selectedScenarioId) {
          const scenarioResponse = await axios.get(`${process.env.REACT_APP_API_URL}/scenarios/${selectedScenarioId}`);
          setScenarioTime(scenarioResponse.data.time); // Assuming 'time' field exists in scenario response
        }
      } catch (error) {
        console.error("Error fetching scenarios:", error);
      }
    };
    fetchScenarios();
  }, [selectedScenarioId]);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (selectedScenarioId) {
        try {
          const result = await axios.get(`${process.env.REACT_APP_API_URL}/vehicles?scenarioId=${selectedScenarioId}`);
          setVehicles(result.data);
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      }
    };

    fetchVehicles();
  }, [selectedScenarioId]);
    
    const handleEdit = (vehicle) => {
      navigate('/edit-vehicle', { state: { vehicle } });
    };


  const handleEditSubmit = async () => {
    try {
     
      if (!editName || !editPositionX || !editPositionY || !editSpeed || !editDirection) {
        throw new Error('All fields are required.');
      }
  
      const updatedVehicle = {
        ...editVehicle,
        name: editName,
        initialPositionX: parseInt(editPositionX),
        initialPositionY: parseInt(editPositionY),
        speed: parseInt(editSpeed),
        direction: editDirection
      };
  
     
      await axios.put(`${process.env.REACT_APP_API_URL}/vehicles/${editVehicle.id}`, updatedVehicle);
  
  
      setVehicles(prevVehicles => {
        return prevVehicles.map(vehicle => {
          if (vehicle.id === editVehicle.id) {
            return updatedVehicle;
          }
          return vehicle;
        });
      });
  
      
      setEditVehicle(null);
      setEditName('');
      setEditPositionX('');
      setEditPositionY('');
      setEditSpeed('');
      setEditDirection('');
      alert('Vehicle details updated successfully.');
    } catch (error) {
      // Handle errors
      alert('Failed to update vehicle details: ' + error.message);
    }
  };
  
  const handleDelete = async (id) => {
    // Send DELETE request to server
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/vehicles/${id}`);
      // Update state to remove the deleted vehicle
      setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== id));
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  return (
    <div className='home'>
      <div className='heading'>Scenario</div>
      <select onChange={(e) => setSelectedScenarioId(e.target.value)} required>
        <option value="">Select Scenario</option>
        {scenarios.map(scenario => (
          <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
        ))}
      </select>

      <div className='heading'>Vehicles</div>
      <table className='table'>
        <thead className='table-head'>
          <tr>
            <th>Vehicle ID</th>
            <th>Vehicle Name</th>
            <th>Position X</th>
            <th>Position Y</th>
            <th>Speed</th>
            <th>Direction</th>
            <th>Edit</th>
            <th>Delete</th>
           
          </tr>
        </thead>
        <tbody className='table-body'>
          {vehicles.map(vehicle => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.name}</td>
              <td>{vehicle.initialPositionX}</td>
              <td>{vehicle.initialPositionY}</td>
              <td>{vehicle.speed}</td>
              <td>{vehicle.direction}</td>
              <td>
                <button onClick={() => handleEdit(vehicle)}>
                  <FontAwesomeIcon icon={faPencilAlt } className='edit'/>
                </button>
                </td>
              <td>
                <button onClick={() => handleDelete(vehicle.id)}>
                  <FontAwesomeIcon icon={faTrash} className='delete' />
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons">
        <button className='start-simulation' onClick={startSimulation} >
          Start Simulation
        </button>
        <button className='stop-simulation' onClick={stopSimulation} >
          Stop Simulation
        </button>
      </div>


      <div className="graph-container">
  {vehicles.map(vehicle => (
    // Check if the vehicle's position is within the bounds of the scenario
    (vehicle.initialPositionX > 0 && vehicle.initialPositionX <= 1000 &&
     vehicle.initialPositionY > 0 && vehicle.initialPositionY <= 450) &&
    <div 
      className='vehicle'
      key={vehicle.id} 
      style={{
        position: 'absolute',
        left: vehicle.initialPositionX,
        top: vehicle.initialPositionY
      }}
    >
      {vehicle.name}
    </div>
  ))}
</div>

    </div>
  );
};

export default HomePage;
