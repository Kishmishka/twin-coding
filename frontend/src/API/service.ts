import axios from 'axios';
import {URLS} from '../constants';
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
    static async saveChange() {
        return instanse.post(URLS.saveChange);
    }
}
