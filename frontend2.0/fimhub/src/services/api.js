import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Mutations by species and OM
export const getMutations = (species, om) => 
  api.get(`/api/mutations/${species}/${om}`);

export const getMutationDetail = (species, om, mutationName) => 
  api.get(`/api/mutation/${species}/${om}/${mutationName}`);

export const getPocketResidues = (species, om) => 
  api.get(`/api/pocket/${species}/${om}`);

// PDB Downloads
export const getPDBFile = (dir, filename) => 
  api.get(`/pdb/${dir}/${filename}`);

// Health check
export const healthCheck = () => api.get('/api/health');

// Datasets info
export const getDatasets = () => api.get('/api/datasets');

export default api;
