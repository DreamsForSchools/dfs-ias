import axios from 'axios';
import {toast} from "react-toastify";

export const savePartner = async (partnerData) => {
    try {
        await axios.post('/api/partner', partnerData);
        toast(`👍 ${partnerData.name} added successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
    // return axios.post('/api/partner', partnerData);
}

export const loadPartnersAggregated =  async (seasonId) => {
    try {
        const request = await axios.get(`/api/partner/aggregated/${seasonId}`);
        return(request.data);
    } catch (e) {
        toast(`❌ Error fetching data: ${e}`);
        return({});
    }
    // return axios.post(`/api/program/aggregated/${seasonId}`)
}