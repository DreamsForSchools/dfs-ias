import axios from 'axios';
import { toast } from 'react-toastify';

export const loadAllInstructors = async (seasonId) => {
    try {
        const request = await axios.get(`/api/instructor/season/` + seasonId);
        console.log(request.data.data);
        return(request.data.data);
    } catch (e) {
        toast(`❌ Error fetching data: ${e}`);
        return([]);
    }
}