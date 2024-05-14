import { ICaret, ICursor, IUser } from './interfaces';

interface IRoomState {
   editorContent: string;
   emptySeats: number[];
   usersOnline: IUser[];
   cursors: ICursor[];
   carets: ICaret[];
   language: string;
}

class OnlineRoomStorage {
   StorageRooms: Map<string, IRoomState>;

   constructor() {
      this.StorageRooms = new Map();
   }

   initializationRoom(
      room: string,
      editorContent: string,
      usersOnline: IUser[],
      emptySeats: number[],
      cursors: ICursor[],
      carets: ICaret[],
      language: string,
   ) {
      this.StorageRooms.set(room, {
         editorContent,
         usersOnline,
         emptySeats,
         cursors,
         carets,
         language,
      });
   }

   setLanguage(room: string, language: string) {
      const roomData = this.StorageRooms.get(room);
      if (roomData) roomData.language = language;
   }

   getLanguage(room: string): string {
      return this.StorageRooms.get(room)?.language || '';
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
      return this.StorageRooms.get(room)?.emptySeats || [5, 4, 3, 2, 1];
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

   getUsers(room: string): IUser[] {
      return this.StorageRooms.get(room)?.usersOnline || [];
   }

   addCaret(room: string, caret: ICaret) {
      this.StorageRooms.get(room)?.carets.push(caret);
   }

   deleteCaret(room: string, caretId: string) {
      const roomData = this.StorageRooms.get(room);
      if (roomData) {
         roomData.carets = roomData.carets.filter((caret: ICaret) => {
            return caret.id !== caretId;
         });
      }
   }

   getCarets(room: string): ICaret[] {
      return this.StorageRooms.get(room)?.carets || [];
   }

   addCursor(room: string, cursor: ICursor) {
      this.StorageRooms.get(room)?.cursors.push(cursor);
   }

   deleteCursor(room: string, cursorId: string) {
      const roomData = this.StorageRooms.get(room);
      if (roomData) {
         roomData.cursors = roomData.cursors.filter((cursor: ICursor) => {
            return cursor.id !== cursorId;
         });
      }
   }

   getCursors(room: string): ICursor[] {
      return this.StorageRooms.get(room)?.cursors || [];
   }
}
export default new OnlineRoomStorage();
