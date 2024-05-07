import axios from 'axios';
import URLS from '../constants/URLS';

const instanse = axios.create({
   baseURL: URLS.httpServer + URLS.portServer,
   timeout: 1000,
});
class Service {
   async saveChange(room: string) {
      return instanse.post(URLS.loadRoomParams, { room });
   }
   async disconect(room: string, id: string) {
      return instanse.post(URLS.disconnect, { room, id });
   }
}

export default new Service();
