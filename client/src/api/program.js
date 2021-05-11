import axios from 'axios';

export const loadPrograms = async (id = '') => {
    return axios.get(`/api/program/${id}`);
}

export const saveProgram = (programData) => {
    return axios.post('/api/program', programData);
}