import axios from 'axios';

export const saveClass = (classData) => {
    return axios.post('/api/class', classData);
}