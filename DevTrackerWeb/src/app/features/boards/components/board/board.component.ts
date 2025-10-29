import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { BoardLite, UpdateBoardRequest } from '../../models/board.model';
import { UpdateBoardComponent } from '../../modals/update-board/update-board.component';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board',
  imports: [UpdateBoardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BoardComponent {
  @ViewChild('updateBoardModal') updateBoardModal!:UpdateBoardComponent;

  constructor(private boardService:BoardService) { }

  @Input() board!:BoardLite;

  openUpdateModal():void {
    this.updateBoardModal.show(this.board.id, this.board.title);
  }

  onUpdateConfirm(update: UpdateBoardRequest) {
    this.boardService.updateBoard(update).subscribe();
  }
}
