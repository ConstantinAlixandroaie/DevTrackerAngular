import { Component, ViewChild  } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { CreateBoardModalComponent } from "../../modals/create-board/create-board.component";
import { CreateBoardRequest } from '../../models/board.model';

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
      error: (error) => {
        console.error('Error fetching boards:', error);
      }
    });
  }

  openCreateBoardModal(): void {
    this.createBoardModal.show();
  }

  onCreateBoardConfirm(createBoardRequest:CreateBoardRequest): void {
    this.boardService.createBoard(createBoardRequest).subscribe({
      next: (data) => {
        this.boardService.getBoards().subscribe();
      },
      error: (error) => {
        console.error('Error creating board:', error);
      }
    });
  }
}
