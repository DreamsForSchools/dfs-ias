import axios from 'axios';
import { toast } from 'react-toastify';

export const loadAllSeason = async () => {
    try {
        const request = await axios.get(`/api/season/`);
        return(request.data);
    } catch (e) {
        toast(`❌ Error fetching data: ${e}`);
        return([]);
    }
}

export const saveSeason = async (seasonData) => {
    try {
        await axios.post('/api/season', seasonData);
        toast(`👍 ${seasonData.name} added successfully!`)
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    }
}