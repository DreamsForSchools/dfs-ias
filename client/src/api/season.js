import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

const extractErrorCode = (message) => {
    return parseInt(message.slice(-3))
}

export const loadSeason = async () => {
    try {
        const response = await axios.get('/api/season');
        if (response.status === StatusCodes.OK) {
            return response.data;
        };
    } catch (e) {
        const errorCode = extractErrorCode(e.message);

        if (errorCode === StatusCodes.BAD_REQUEST) {
            return [];
        }
    }
}

export const saveSeason = (seasonData) => {
    // try {
    //     const request = await axios.post('/api/season', seasonData);
    //     if (request.status === StatusCodes.OK) {
    //         return {error: false, data: request.data};
    //     }
    // } catch (e) {
    //     const errorCode = extractErrorCode(e.message);
    //
    //     if (errorCode === StatusCodes.BAD_REQUEST) {
    //         return e.message;
    //     }
    // }
    return axios.post('/api/season', seasonData)
}