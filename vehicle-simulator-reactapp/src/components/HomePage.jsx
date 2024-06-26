import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllScenarios, getScenarioById } from '../services/scenarioService';
import { getVehiclesByScenarioId, deleteVehicle } from '../services/vehicleService';

const HomePage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [simulationInterval, setSimulationInterval] = useState(null);
  const [scenarioTime, setScenarioTime] = useState(null);
  const navigate = useNavigate(); 
  
  let counter = 0;
  
  const colors = ["red", "blue", "green", "orange", "purple", "cyan", "magenta"];

  const getColorForVehicle = (index) => {
    return colors[index % colors.length];
  };

  const stopSimulation = () => {
    clearInterval(simulationInterval);
    console.log("Simulation stopped.", counter);
    toast.info('Simulation stopped successfully');
    setSimulationInterval(null);
    console.log(simulationInterval);
  };

  const startSimulation = () => {
    if (!selectedScenarioId) {
      console.log("Please select a scenario first.");
      toast.error('Please select a scenario first.');
      return;
    }

    if (simulationInterval != null) {
      console.log(simulationInterval);
      console.log("Simulation is already running.");
      toast.error('Simulation is already running.');
      return;
    }

    toast.success('Simulation started successfully');

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

          newPositionX = Math.max(0, Math.min(newPositionX, 1050)); 
          newPositionY = Math.max(0, Math.min(newPositionY, 450));

          return { ...vehicle, initialPositionX: newPositionX, initialPositionY: newPositionY };
        });
      });

      counter++;
      console.log("Simulation running for", counter, "seconds. Scenario time:", scenarioTime, "simulation time", simulationInterval);

      if (counter >= scenarioTime) {
        console.log("Scenario time reached. Stopping simulation.");
        toast.success('Scenario time reached. Stopping simulation.');
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
        const scenarios = await getAllScenarios();
        setScenarios(scenarios);
      } catch (error) {
        console.error("Error fetching scenarios:", error);
        toast.error('Failed to fetch scenarios');
      }
    };
    fetchScenarios();
  }, []);

  useEffect(() => {
    const fetchScenariosAndScenarioTime = async () => {
      try {
        const scenarios = await getAllScenarios();
        setScenarios(scenarios);
       
        if (selectedScenarioId) {
          const scenario = await getScenarioById(selectedScenarioId);
          setScenarioTime(scenario.time); 
        }
      } catch (error) {
        console.error("Error fetching scenarios:", error);
        toast.error('Failed to fetch scenarios');
      }
    };
    fetchScenariosAndScenarioTime();
  }, [selectedScenarioId]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        if (selectedScenarioId) {
          const vehiclesData = await getVehiclesByScenarioId(selectedScenarioId);
          setVehicles(vehiclesData);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, [selectedScenarioId]);
  
  useEffect(() => {
    if (simulationInterval) {
      stopSimulation();
    }
  }, [selectedScenarioId]);

  const handleEdit = (vehicle) => {
    navigate('/edit-vehicle', { state: { vehicle } });
  };

  const handleDelete = async (vehicleId) => {
    try {
      await deleteVehicle(vehicleId);
      setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== vehicleId));
      toast.success('Vehicle deleted successfully');
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast.error('Failed to delete vehicle');
    }
  };

  return (
    <div className='home'>
      <ToastContainer />
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
          {vehicles.map((vehicle, index) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.name}</td>
              <td>{vehicle.initialPositionX}</td>
              <td>{vehicle.initialPositionY}</td>
              <td>{vehicle.speed}</td>
              <td>{vehicle.direction}</td>
              <td>
                <button onClick={() => handleEdit(vehicle)}>
                  <FontAwesomeIcon icon={faPencilAlt} className='edit' />
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
        <button className='start-simulation' onClick={startSimulation}>
          Start Simulation
        </button>
        <button className='stop-simulation' onClick={stopSimulation}>
          Stop Simulation
        </button>
      </div>

      <div className="graph-container">
        {vehicles.map((vehicle, index) => (
          (vehicle.initialPositionX > 0 && vehicle.initialPositionX < 1050 &&
           vehicle.initialPositionY > 0 && vehicle.initialPositionY < 450) &&
          <div 
            className='vehicle'
            key={vehicle.id} 
            style={{
              position: 'absolute',
              left: vehicle.initialPositionX,
              top: vehicle.initialPositionY,
              backgroundColor: getColorForVehicle(index)
            }}
          >
            {vehicle.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
