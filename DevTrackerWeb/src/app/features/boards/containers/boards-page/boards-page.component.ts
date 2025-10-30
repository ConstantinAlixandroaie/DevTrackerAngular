import { Component, viewChild, ViewChild  } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { CreateBoardModalComponent } from "../../modals/create-board/create-board.component";
import { CreateBoardRequest } from '../../models/board.model';
import { BoardGridComponent } from "../../components/board-grid/board-grid.component";

@Component({
  selector: 'app-boards-page',
  imports: [CreateBoardModalComponent, BoardGridComponent],
  templateUrl: './boards-page.component.html',
  styleUrl: './boards-page.component.css'
})

export class BoardsPageComponent {
  constructor(
    private boardService:BoardService,
  ) { } 

  @ViewChild('createBoardModal') createBoardModal!: CreateBoardModalComponent;
  @ViewChild(BoardGridComponent) boardGridComponent!: BoardGridComponent;

  openCreateBoardModal(): void {
    this.createBoardModal.show();
  }

  onCreateBoardConfirm(createBoardRequest:CreateBoardRequest): void {
    this.boardService.createBoard(createBoardRequest).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Error creating board:', error);
      }
    });
  }
}
