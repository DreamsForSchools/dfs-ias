import axios from 'axios';
import {toast} from "react-toastify";
import {createToken} from "../fire";

export const saveProgram = async (programData) => {
    try {
        const header = await createToken();
        await axios.post('/api/program', programData, header);
        toast(`👍 ${programData.name} added successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
}

export const loadProgramsAggregated =  async (seasonId) => {
    try {
        const header = await createToken();
        const request = await axios.get(`/api/program/aggregated/${seasonId}`, header);
        return(request.data);
    } catch (e) {
        toast(`❌ Error fetching data: ${e}`);
        return({});
    }
    // return axios.post(`/api/program/aggregated/${seasonId}`)
}