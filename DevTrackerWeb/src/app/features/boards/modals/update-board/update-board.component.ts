import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UpdateBoardRequest } from '../../models/board.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-update-board',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-board.component.html',
  styleUrl: './update-board.component.css'
})

export class UpdateBoardComponent {
  @Input() boardId!: number;
  @Input() boardTitle!: string;
  @Output() confirm = new EventEmitter<UpdateBoardRequest>();
  @ViewChild('modalElement') modalElement!: ElementRef;

  private modalInstance: any;

  boardIdControl = new FormControl<number>(0);
  boardTitleControl = new FormControl('');

  constructor(private modalService: ModalService) {}

  async ngAfterViewInit() {
    this.modalInstance = await this.modalService.createModal(this.modalElement.nativeElement);
  }

  async show(boardId: number, title: string) {
    this.boardIdControl.setValue(boardId);
    this.boardTitleControl.setValue(title);
    this.modalService.show(this.modalInstance);
  }

  hide() {
    this.modalService.hide(this.modalInstance);
  }

  onConfirm() {
    const updateBoardRequest: UpdateBoardRequest = {
      id: this.boardIdControl.value || 0,
      title: this.boardTitleControl.value || ''
    };

    this.hide();
    
    setTimeout(() => {
      this.confirm.emit(updateBoardRequest);
    }, 150);
  }

  ngOnDestroy() {
    this.modalService.dispose(this.modalInstance);
  }
}