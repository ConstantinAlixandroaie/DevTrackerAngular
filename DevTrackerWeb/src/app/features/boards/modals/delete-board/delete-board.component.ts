import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-delete-board',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './delete-board.component.html',
  styleUrl: './delete-board.component.css'
})
export class DeleteBoardComponent {
  @Input() boardId!: number;
  @Input() title = '';
  @Output() confirm = new EventEmitter<number>();

  @ViewChild('modalElement') modalElement!: ElementRef;
  private modalInstance: any;

  boardIdControl = new FormControl<number>(0);

  constructor(private modalService: ModalService) {}

  async ngAfterViewInit() {
    this.modalInstance = await this.modalService.createModal(this.modalElement.nativeElement);
  }

  async show(boardId: number,title:string) {
    this.boardIdControl.setValue(boardId);
    this.title = title;
    this.modalService.show(this.modalInstance);
  }
  
  hide() {
    this.modalService.hide(this.modalInstance);
  }

  onConfirm() {
    this.hide();
    setTimeout(() => {this.confirm.emit(this.boardIdControl.value!);}, 150);
  }

  ngOnDestroy() {
    this.modalService.dispose(this.modalInstance);
  }
}
