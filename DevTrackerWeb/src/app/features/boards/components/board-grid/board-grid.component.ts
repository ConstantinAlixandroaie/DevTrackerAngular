import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardComponent } from "../board/board.component";
import { BoardService } from '../../services/board.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-grid',
  imports: [CommonModule, BoardComponent],
  templateUrl: './board-grid.component.html',
  styleUrl: './board-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BoardGridComponent{
  constructor(private boardService: BoardService) { }

  get boardsCollection$() {
    return this.boardService.boards$;
  }

  ngOnInit(): void {
    this.boardService.getBoards().subscribe();
  }
}
