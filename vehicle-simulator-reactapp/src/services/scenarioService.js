import api from './api';

const getAllScenarios = async () => {
  try {
    const response = await api.get('/scenarios', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};

const getScenarioById = async (id) => {
  try {
    const response = await api.get(`/scenarios/${id}`,{
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createScenario = async (scenario) => {
  try {
    const response = await api.post('/scenarios', scenario);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateScenario = async (id, updatedScenario) => {
  try {
    const response = await api.put(`/scenarios/${id}`, updatedScenario);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteScenario = async (id) => {
  try {
    const response = await api.delete(`/scenarios/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteAllScenarios = async () => {
  try {
    const response = await api.delete('/scenarios');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getAllScenarios,
  getScenarioById,
  createScenario,
  updateScenario,
  deleteScenario,
  deleteAllScenarios,
};
