import { Component, ViewChild  } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { CreateBoardModalComponent } from "../../modals/create-board/create-board.component";

@Component({
  selector: 'app-boards-page',
  imports: [CreateBoardModalComponent],
  templateUrl: './boards-page.component.html',
  styleUrl: './boards-page.component.css'
})
export class BoardsPageComponent {
  constructor( private boardService:BoardService) { } 
   @ViewChild('createBoardModal') createBoardModal!: CreateBoardModalComponent;

  ngOnInit(): void {
    this.boardService.getBoards().subscribe({
      next: (data) => {
        console.log('Boards data received:', data);
      },
      error: (error) => {
        console.error('Error fetching boards:', error);
      }
    });
  }

  openCreateBoardModal(): void {
    this.createBoardModal.show();
  }

  onCreateBoardConfirm(boardTitle:string): void {
    this.boardService.createBoard(boardTitle).subscribe({
      next: (data) => {
        console.log('Board created successfully:', data);
        this.boardService.getBoards().subscribe();
      },
      error: (error) => {
        console.error('Error creating board:', error);
      }
    });
  }
}
