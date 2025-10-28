export interface BoardLite{
    id: number;
    title: string;
}

export interface Boards{
    boards: BoardLite[];
}

export interface Board extends BoardLite{
    createdBy: string;
    ownder: string;
}

export interface CreateBoardRequest{
    title:string;
}

export interface UpdateBoardRequest{
    id:number;
    boardTitle:string;
}