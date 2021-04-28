import axios from 'axios';

export const loadSeason = async (id = '') => {
    return axios.get(`/api/season/${id}`);
}

export const saveSeason = (seasonData) => {
    return axios.post('/api/season', seasonData);
}