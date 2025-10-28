import { UserLite } from "../../account/models/account.model";

export interface BoardLite{
    id: number;
    title: string;
}

export interface Boards{
    boards: BoardLite[];
}

export interface Board extends BoardLite{
    tasks:string;
    createdBy: UserLite;
    ownder: UserLite;
    users: UserLite[];
}

export interface CreateBoardRequest{
    title:string;
}

export interface UpdateBoardRequest{
    id:number;
    boardTitle:string;
}