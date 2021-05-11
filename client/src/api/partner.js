import axios from 'axios';

export const loadPartner = async (id = '') => {
    return axios.get(`/api/partner/${id}`);
}

export const savePartner = (partnerData) => {
    return axios.post('/api/partner', partnerData);
}