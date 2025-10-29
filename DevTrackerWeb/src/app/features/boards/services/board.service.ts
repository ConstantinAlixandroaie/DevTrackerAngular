import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { BehaviorSubject, Observable, tap,map } from 'rxjs';
import { Board, Boards, CreateBoardRequest, UpdateBoardRequest } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})

export class BoardService {
  private boardsSubject = new BehaviorSubject<Boards>({boards:[]});
  boards$ = this.boardsSubject.asObservable();

  constructor(private api:ApiService) { }

  getBoards():Observable<Boards>{ 
    var response= this.api.get<Boards>('board').pipe(
      tap((data)=>this.boardsSubject.next(data))
    );
    console.log(response);
    return response;
  }

  getBoard(id:number):Observable<Board>{
    return this.api.get<Board>(`board/${id}`);
  }

  createBoard(createBoardRequest:CreateBoardRequest):Observable<Board>{
    return this.api.post<{board:Board}>('board/create',createBoardRequest).pipe(
      map(response => response.board),
      tap((board)=>{
        const currentBoards = this.boardsSubject.value;
        this.boardsSubject.next({
          ...currentBoards,
          boards:[...currentBoards.boards,board]});
      })
    );
  }

  updateBoard(updateBoardRequest:UpdateBoardRequest):Observable<Board>{
    return this.api.patch<Board>(`board/update`,updateBoardRequest).pipe(
      tap((updatedBoard)=>{
        const currentBoards = this.boardsSubject.value;
        const updatedBoards = currentBoards.boards.map(b => b.id === updatedBoard.id ? updatedBoard : b);
        this.boardsSubject.next({ ...currentBoards, boards: updatedBoards});
      })
    );
  }
  
  deleteBoard(id:number):Observable<void>{
    return this.api.delete<void>(`board/delete/${id}`).pipe(
      tap(()=>{
        const currentBoards = this.boardsSubject.value;
        const remainingBoards = currentBoards.boards.filter(b => b.id !== id);
        this.boardsSubject.next({ ...currentBoards, boards: remainingBoards});
      })
    );
  }
}
