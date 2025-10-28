import { UserLite } from "../../account/models/account.model";
import { TaskItem } from "../../tasks/models/task.model";

export interface Note{
    id: number;
    content: string;
    taskId: number;
    taskItem: TaskItem;
    createdAt: Date;
    updatedAt: Date;
    createdbyId: number;
    createdBy:UserLite;
}