import axios from 'axios';
import {toast} from "react-toastify";

export const saveProgram = async (programData) => {
    try {
        await axios.post('/api/program', programData);
        toast(`👍 ${programData.name} added successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
}

export const loadProgramsAggregated =  async (seasonId) => {
    try {
        const request = await axios.get(`/api/program/aggregated/${seasonId}`);
        return(request.data);
    } catch (e) {
        toast(`❌ Error fetching data: ${e}`);
        return({});
    }
    // return axios.post(`/api/program/aggregated/${seasonId}`)
}