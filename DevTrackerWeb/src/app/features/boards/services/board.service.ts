import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { Board, Boards, CreateBoardRequest, UpdateBoardRequest } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  constructor(private api:ApiService) { }

  getBoards():Observable<Boards>{ {
    return this.api.get('board');
    } 
  }

  getBoard(id:number):Observable<Board>{
    return this.api.get<Board>(`board/${id}`);
  }

  createBoard(createBoardRequest:CreateBoardRequest):Observable<Board>{
    return this.api.post<Board>('board/create',{createBoardRequest});
  }

  updateBoard(updateBoardRequest:UpdateBoardRequest):Observable<Board>{
    return this.api.patch<Board>(`board/update`,{updateBoardRequest});
  }
  
  deleteBoard(id:number):Observable<void>{
    return this.api.delete<void>(`board/delete/${id}`);
  }
}
