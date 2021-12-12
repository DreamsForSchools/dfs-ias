import axios from 'axios';
import {toast} from "react-toastify";
import {createToken} from "../fire";

export const savePartner = async (partnerData) => {
    try {
        const header = await createToken();
        await axios.post('/api/partner', partnerData, header);
        toast(`👍 ${partnerData.name} added successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
    // return axios.post('/api/partner', partnerData);
}

export const loadPartnersAggregated =  async (seasonId) => {
    try {
        const header = await createToken();
        const request = await axios.get(`/api/partner/aggregated/${seasonId}`, header);
        return(request.data);
    } catch (e) {
        toast(`❌ Error fetching partner data: ${e}`);
        return({});
    }
    // return axios.post(`/api/program/aggregated/${seasonId}`)
}

export const deletePartner = async (partnerId) => {
    try {
        const header = await createToken();
        await axios.delete(`/api/partner/${partnerId}`, header);
        toast(`👍 Partner deleted successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
}

export const updatePartner = async (partnerData) => {
    try {
        const header = await createToken();
        await axios.put(`/api/partner/${partnerData.partnerId}`, partnerData, header);
        toast(`👍 ${partnerData.name} updated successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
}
