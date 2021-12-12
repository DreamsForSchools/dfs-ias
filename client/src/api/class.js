import axios from 'axios';
import {toast} from "react-toastify";
import {createToken} from "../fire";

export const saveClass = async (classData) => {
    try {
        const header = await createToken();
        await axios.post('/api/class', classData, header);
        toast(`👍 Class added successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
}

export const updateClass = async (classData) => {
    try {
        const header = await createToken();
        await axios.put(`/api/class/${classData.classId}`, classData, header);
        toast(`👍 Class updated successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
}

export const deleteClass = async (classId) => {
    try {
        const header = await createToken();
        await axios.delete(`/api/class/${classId}`, header);
        toast(`👍 Class deleted successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
}
