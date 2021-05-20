import axios from 'axios';
import { toast } from 'react-toastify';

export const loadAllInstructors = async () => {
  try {
      const request = await axios.get(`/api/instructor/`);
      return(request.data);
  } catch (e) {
      toast(`❌ Error fetching data: ${e}`);
      return([]);
  }
}