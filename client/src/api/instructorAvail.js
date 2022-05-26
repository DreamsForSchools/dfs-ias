import axios from 'axios';
import { toast } from 'react-toastify';
import {createToken} from "../fire";

export const getInstructorAvailability = async (instructorId) => {
    try{
        const header = await createToken();
        
        // probably broken
        // const request = await axios.get(`/instructor/availability/${instructorId}`, header);        
        const request = await axios.get(`api/instructor/availability/${instructorId}`, header);     
        
        console.log(request.data+"owo");
        return(request.data);

        toast(`👍 Instructor ${instructorId} avail fetched!`);
    } catch (e) {
        console.log(e);
        toast(`❌ ${e}`);
    } 
}