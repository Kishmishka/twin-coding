import { IUser } from '../interfaces';

interface IRoomState {
    editorContent: string;
    emptySeats: number[];
    usersOnline: IUser[];
    //  cursors: IPositionCursor[];
    //  textCursors: IPositionTextCursor[];
}

class OnlineRoomStorage {
    StorageRooms: Map<string, IRoomState>;

    constructor() {
        this.StorageRooms = new Map();
    }
    setEditorContent(room: string, editorContentr: string) {
        const roomData = this.StorageRooms.get(room);
        if (roomData) roomData.editorContent = editorContentr;
    }

    getEditorContent(room: string): string {
        return this.StorageRooms.get(room)?.editorContent || '';
    }

    freeSeats(room: string, emptySeat: number) {
        this.StorageRooms.get(room)?.emptySeats.push(emptySeat);
    }

    takeSeat(room: string): number {
        return this.StorageRooms.get(room)?.emptySeats.pop() || 0;
    }

    getEmptySeats(room: string): number[] {
        return this.StorageRooms.get(room)?.emptySeats || [5,4,3,2,1];
    }

    addUser(room: string, user: IUser) {
        this.StorageRooms.get(room)?.usersOnline.push(user);
    }

    deleteUser(room: string, userId: string) {
        const roomData = this.StorageRooms.get(room);
        if (roomData) {
            roomData.usersOnline = roomData.usersOnline.filter((user: IUser) => {
                return user.id !== userId;
            });
        }
    }

    getUsers(room: string) {
        return this.StorageRooms.get(room)?.usersOnline || [];
    }

    initializationRoom(
        room: string,
        editorContent: string,
        usersOnline: IUser[],
        emptySeats: number[],
    ) {
        this.StorageRooms.set(room, {
            editorContent,
            usersOnline,
            emptySeats,
        });
    }
}
export default new OnlineRoomStorage();
