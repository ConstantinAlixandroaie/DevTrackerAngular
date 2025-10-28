import { Component, Input } from '@angular/core';
import { BoardLite } from '../../models/board.model';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})

export class BoardComponent {
  constructor() { }
  @Input() board!:BoardLite;
}
