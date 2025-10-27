import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
  @Output() confirm = new EventEmitter<string>(); // Changed to emit string

  @ViewChild('modalElement') modalElement!: ElementRef;
  private modalInstance?: BootstrapModal;
  private isBrowser: boolean;

  // FormControl for the input
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
      this.boardTitleControl.reset(); // Clear the input when opening
      this.modalInstance?.show();
    }
  }

  hide() {
    if (this.isBrowser) {
      this.modalInstance?.hide();
    }
  }

  onConfirm() {
    const boardTitle = this.boardTitleControl.value || '';
    this.confirm.emit(boardTitle); // Emit the board title
    this.hide();
  }

  ngOnDestroy() {
    if (this.isBrowser && this.modalInstance) {
      this.modalInstance.dispose();
    }
  }
}