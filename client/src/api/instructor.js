import axios from 'axios';
import { toast } from 'react-toastify';

export const loadAllInstructorsAggregated = async (seasonId) => {
    try {
        const request = await axios.get(`/api/instructor/aggregated/` + seasonId);
        console.log(request.data);
        return(request.data);
    } catch (e) {
        toast(`❌ Error fetching data: ${e}`);
        return([]);
    }
}