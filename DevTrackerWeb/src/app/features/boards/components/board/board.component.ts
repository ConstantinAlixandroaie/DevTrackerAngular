import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BoardLite } from '../../models/board.model';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BoardComponent {
  constructor() { }
  @Input() board!:BoardLite;
}
