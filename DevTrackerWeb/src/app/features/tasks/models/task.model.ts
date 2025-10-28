import { UserLite } from "../../account/models/account.model";
import { Board } from "../../boards/models/board.model";

export interface TaskItem{
    id:number;
    title:string;
    description:string;
    status:string;
    notes:string[];//todo: change to Note interface later
    tags:string[];//todo: change to Tag interface later
    createdAt:Date;
    updatedAt:Date;
    createdbyId:number;
    createdBy:UserLite;
    assignee:UserLite;
    board:Board
}