import axios from 'axios';
import URLS from '../constants/URLS';

const instanse = axios.create({
    baseURL: URLS.httpServer + URLS.portServer,
    timeout: 1000,
});
class Service {
    async createRoom() {
        return instanse.post(URLS.createRoom);
    }
    async getRooms() {
        return instanse.get(URLS.getRooms);
    }
    async saveChange(room: string) {
        return instanse.post(URLS.saveChange, { room });
    }
    async disconect(room: string, id: string) {
        return instanse.post(URLS.disconnect, { room, id });
    }
}

export default new Service();
