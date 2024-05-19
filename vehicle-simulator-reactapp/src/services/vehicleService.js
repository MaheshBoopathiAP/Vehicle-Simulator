import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const getAllVehicles = async () => {
  const response = await axios.get(`${apiUrl}/vehicles`, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  return response.data;
};

export const getVehicleById = async (id) => {
  const response = await axios.get(`${apiUrl}/vehicles/${id}`, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  return response.data;
};

export const createVehicle = async (vehicle) => {
  const response = await axios.post(`${apiUrl}/vehicles`, vehicle);
  return response.data;
};

export const updateVehicle = async (id, vehicle) => {
  const response = await axios.put(`${apiUrl}/vehicles/${id}`, vehicle);
  return response.data;
};

export const deleteVehicle = async (id) => {
  const response = await axios.delete(`${apiUrl}/vehicles/${id}`);
  return response.data;
};

export const getVehiclesByScenarioId = async (scenarioId) => {
  const response = await axios.get(`${apiUrl}/vehicles?scenarioId=${scenarioId}`, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  return response.data;
};
