import axios from 'axios';
const instans = axios.create({
    baseURL: 'http://localhost:4040',
    timeout: 1000,
});
export default class Service {
    static async createRoom() {
        const response = instans.post('/createRoom');
        return response;
    }

    static async getRooms() {
        const response = instans.get('/getRooms');
        return response;
    }
    static async saveChange() {
        const response = instans.post('/saveChange');
        return response;
    }
}
