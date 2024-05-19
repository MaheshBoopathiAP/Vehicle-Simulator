import React, { useState, useEffect } from 'react';
import { getAllVehicles } from '../services/vehicleService'; 

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesData = await getAllVehicles(); 
        setVehicles(vehiclesData);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div>
      <h2>All Vehicles</h2>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle.id}>{vehicle.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;
