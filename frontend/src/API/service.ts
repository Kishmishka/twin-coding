import axios from 'axios';
const instans = axios.create({
    baseURL: 'http://localhost:3030',
    timeout: 1000,
});
export default class Service {
    //  static async getAll(limit = 10, page = 1) {
    //      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    //          params: {
    //              _limit: limit,
    //              _page: page,
    //          },
    //      });
    //      return response;
    //  }

    static async createRoom() {
        const response = instans.post('/createRoom');
        //   const response = await  axios.post('http://localhost:3030/createRoom');
        return response;
    }

    static async getRooms() {
        //   const response = await axios.get('http://localhost:3030/getRooms');
        const response = instans.get('/getRooms');
        return response;
    }
}
