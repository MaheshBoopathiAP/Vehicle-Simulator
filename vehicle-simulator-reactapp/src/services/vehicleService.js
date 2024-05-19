import api from './api';

export const getAllVehicles = async () => {
  const response = await api.get(`/vehicles`, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  return response.data;
};

export const getVehicleById = async (id) => {
  const response = await api.get(`/vehicles/${id}`, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  return response.data;
};

export const createVehicle = async (vehicle) => {
  const response = await api.post(`/vehicles`, vehicle);
  return response.data;
};

export const updateVehicle = async (id, vehicle) => {
  const response = await api.put(`/vehicles/${id}`, vehicle);
  return response.data;
};

export const deleteVehicle = async (id) => {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
};

export const getVehiclesByScenarioId = async (scenarioId) => {
  const response = await api.get(`/vehicles?scenarioId=${scenarioId}`, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  return response.data;
};
