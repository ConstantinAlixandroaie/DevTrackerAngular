import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { BoardLite, UpdateBoardRequest } from '../../models/board.model';
import { UpdateBoardComponent } from '../../modals/update-board/update-board.component';
import { BoardService } from '../../services/board.service';
import { DeleteBoardComponent } from '../../modals/delete-board/delete-board.component';

@Component({
  selector: 'app-board',
  imports: [UpdateBoardComponent,DeleteBoardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BoardComponent {
  @ViewChild('updateBoardModal') updateBoardModal!:UpdateBoardComponent;
  @ViewChild('deleteBoardModal') deleteBoardModal!:DeleteBoardComponent;

  constructor(private boardService:BoardService) { }

  @Input() board!:BoardLite;

  openUpdateModal():void {
    this.updateBoardModal.show(this.board.id, this.board.title);
  }
  openDeleteModal():void {
    this.deleteBoardModal.show(this.board.id,this.board.title);
  }

  onUpdateConfirm(update: UpdateBoardRequest) {
    this.boardService.updateBoard(update).subscribe();
  }
  onDeleteConfirm(boardId: number) {
    this.boardService.deleteBoard(boardId).subscribe();
  }
}
