import { Component } from '@angular/core';
import { BoardComponent } from "../board/board.component";
import { BoardService } from '../../services/board.service';
import { Boards } from '../../models/board.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-grid',
  imports: [CommonModule, BoardComponent],
  templateUrl: './board-grid.component.html',
  styleUrl: './board-grid.component.css'
})

export class BoardGridComponent{
  boards: Boards={boards:[]};

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getBoards().subscribe({
      next: (data) => {
        this.boards = data;
      },
      error: (error) => {
        console.error('Error fetching boards:', error);
      }
    });
  }
}
