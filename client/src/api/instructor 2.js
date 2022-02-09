import axios from 'axios';
import { toast } from 'react-toastify';
import {createToken} from "../fire";

export const loadAllInstructorsAggregated = async (seasonId) => {
    try {
        const header = await createToken();
        const request = await axios.get(`/api/instructor/aggregated/` + seasonId, header);
        console.log(request.data);
        return(request.data);
    } catch (e) {
        toast(`❌ Error fetching instructor data: ${e}`);
        return([]);
    }
}

export const saveInstructor = async (instructorData) => {
    try {
        const header = await createToken();
        await axios.post('/api/instructor', instructorData, header);
        toast(`👍 Instructor ${instructorData.firstName} ${instructorData.lastName} added successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
}

// for updating in sideinfo
export const updateInstructor = async (instructorData) => {
    try{
        const header = await createToken();
        // need to get instructorID for the axios put request.
        await axios.put(`/api/instructor/${instructorData.instructorId}`, instructorData, header);
        toast(`👍 Instructor ${instructorData.firstName} ${instructorData.lastName} updated successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    } 
}

export const deleteInstructor = async (instructorId) => {
    try {
        const header = await createToken();
        await axios.delete(`/api/instructor/${instructorId}`, header);
        toast(`👍 Instructor deleted successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
}