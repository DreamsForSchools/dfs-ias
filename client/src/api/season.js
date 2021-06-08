import axios from 'axios';
import { toast } from 'react-toastify';
import {createToken} from "../fire";

export const loadAllSeason = async () => {
    try {
        const header = await createToken();
        const request = await axios.get(`/api/season/`, header);
        return(request.data);
    } catch (e) {
        toast(`❌ Error fetching season data: ${e}`);
        return([]);
    }
}

export const saveSeason = async (seasonData) => {
    try {
        const header = await createToken();
        await axios.post('/api/season', seasonData, header);
        toast(`👍 ${seasonData.name} added successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
}