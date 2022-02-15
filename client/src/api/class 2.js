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