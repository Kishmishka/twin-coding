import axios from 'axios';
import URLS from '../constants/URLS';

const instanse = axios.create({
    baseURL: URLS.httpServer + URLS.portServer,
    timeout: 1000,
});
export default class Service {
    static async createRoom() {
        return instanse.post(URLS.createRoom);
    }
    static async getRooms() {
        return instanse.get(URLS.getRooms);
    }
    static async saveChange(room: string) {
        return instanse.post(URLS.saveChange, { room });
    }
    static async disconect(room: string, id: string) {
        return instanse.post(URLS.disconnect, { room, id });
    }
}
