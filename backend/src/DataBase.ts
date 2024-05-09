import { PrismaClient } from '@prisma/client';
import { IRoomParams } from './interfaces';

export default class DataBase {
   prisma: PrismaClient;

   constructor() {
      this.prisma = new PrismaClient();
   }

   async disconect() {
      await this.prisma.$disconnect();
   }

   public async createRoom() {
      return await this.prisma.room.create({
         data: {
            language: 'Java script',
            editorContent: '//good luck:)',
         },
      });
   }

   public async getRooms() {
      return await this.prisma.room.findMany();
   }

   public async getRoomParams(id: number) {
      const RoomNotExist: IRoomParams = {
         id: -1,
         language: '',
         editorContent: '',
      };
      const res = await this.prisma.room.findUnique({ where: { id } });
      if (res) {
         return res;
      } else {
         return RoomNotExist;
      }
   }

   public async updateRoomParams(roomParams: IRoomParams) {
      return await this.prisma.room.update({
         where: { id: roomParams.id },
         data: {
            language: roomParams.language,
            editorContent: roomParams.editorContent,
         },
      });
   }
}
