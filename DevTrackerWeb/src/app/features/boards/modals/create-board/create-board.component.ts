import { Component, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreateBoardRequest } from '../../models/board.model';
import { ModalService } from '../../services/modal.service';

type BootstrapModal = any;

@Component({
  selector: 'create-board-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css'],
})
export class CreateBoardModalComponent {
  @Output() confirm = new EventEmitter<CreateBoardRequest>();

  @ViewChild('modalElement') modalElement!: ElementRef;
  private modalInstance?: BootstrapModal;

  boardTitleControl = new FormControl('');

  constructor(private modalService: ModalService) {}

  async ngAfterViewInit() {
   this.modalInstance = await this.modalService.createModal(this.modalElement.nativeElement);
  }

  async show() {
      this.boardTitleControl.reset();
      this.boardTitleControl.setValue(this.boardTitleControl.value);
      this.modalService.show(this.modalInstance);
  }

  hide() {
    this.modalService.hide(this.modalInstance);
  }

  onConfirm() {
    var createBoardRequest: CreateBoardRequest = { title: this.boardTitleControl.value || '' };
    this.hide();
    setTimeout(() => {
      this.confirm.emit(createBoardRequest);
    }, 150);
  }

  ngOnDestroy() {
   this.modalService.dispose(this.modalInstance);
  }
}