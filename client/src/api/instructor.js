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