import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreateBoardRequest } from '../../models/board.model';

type BootstrapModal = any;

@Component({
  selector: 'create-board-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css'],
})
export class CreateBoardModalComponent {
  @Input() title = 'Create Board';
  @Input() confirmText?: string;
  @Output() confirm = new EventEmitter<CreateBoardRequest>();

  @ViewChild('modalElement') modalElement!: ElementRef;
  private modalInstance?: BootstrapModal;
  private isBrowser: boolean;

  boardTitleControl = new FormControl('');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngAfterViewInit() {
    if (this.isBrowser) {
      await this.initializeModal();
    }
  }

  private async initializeModal() {
    const { Modal } = await import('bootstrap');
    this.modalInstance = new Modal(this.modalElement.nativeElement);
  }

  async show() {
    if (this.isBrowser) {
      if (!this.modalInstance) {
        await this.initializeModal();
      }
      this.boardTitleControl.reset();
      this.modalInstance?.show();
    }
  }

  hide() {
    if (this.isBrowser) {
      this.modalInstance?.hide();
    }
  }

  onConfirm() {
    var createBoardRequest: CreateBoardRequest = { title: this.boardTitleControl.value || '' };
    this.confirm.emit(createBoardRequest);
    this.hide();
  }

  ngOnDestroy() {
    if (this.isBrowser && this.modalInstance) {
      this.modalInstance.dispose();
    }
  }
}