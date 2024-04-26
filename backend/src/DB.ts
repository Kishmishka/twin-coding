import { PrismaClient } from '@prisma/client';
import { IRoomParams } from './interfaces';

export default class DB {
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
            seatsCount: 5,
        };
        const res = await this.prisma.room.findUnique({ where: { id } });
        if (res) {
            return res;
        } else {
            return RoomNotExist;
        }
    }
    public async updateRoomParams(roomParams: IRoomParams) {
        const res = await this.prisma.room.update({
            where: { id: roomParams.id },
            data: {
                language: roomParams.language,
                editorContent: roomParams.editorContent,
            },
        });
        return res;
    }
    public async updateSeatsCount(count: number, room: number) {
        const res = await this.prisma.room.update({
            where: { id: room },
            data: {
                seatsCount: count,
            },
        });
        return res;
    }
}