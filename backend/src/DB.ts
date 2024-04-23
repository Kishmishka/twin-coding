import { PrismaClient } from '@prisma/client';

export default class DB {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async disconect() {
        await this.prisma.$disconnect();
    }

    public async createRoom() {
        await this.prisma.room.create({
            data: {
                language: 'java',
                editorContent: 'goodluck)',
                link: 'http://localhost:5173/',
            },
        });
    }
    public async getRooms() {
        return await this.prisma.room.findMany();
    }
}
