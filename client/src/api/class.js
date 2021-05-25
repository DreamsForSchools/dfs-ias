import axios from 'axios';
import {toast} from "react-toastify";

export const saveClass = async (classData) => {
    try {
        await axios.post('/api/class', classData);
        toast(`👍 Class added successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
}