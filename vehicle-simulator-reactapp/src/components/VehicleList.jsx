import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/vehicles`);
      setVehicles(result.data);
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
