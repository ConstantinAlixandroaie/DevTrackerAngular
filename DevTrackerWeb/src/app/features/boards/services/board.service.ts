import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

interface Board{
  id: number;
  title: string;
}
interface Boards{
  boards: Board[];
}

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  constructor(private api:ApiService) { }

  getBoards():Observable<Boards>{ {
    const response=this.api.get<Boards>('board');
    console.log('getBoards response:', response);
    return this.api.get('board');
    } 
  }
  getBoard(id:number):Observable<Board>{
    return this.api.get<Board>(`board/${id}`);
  }
  createBoard(boardTitle:string):Observable<Board>{
    return this.api.post<Board>('board/createboard',{boardTitle});
  }
}
