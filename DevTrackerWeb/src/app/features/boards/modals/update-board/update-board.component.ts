import { Component, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { UpdateBoardRequest } from '../../models/board.model';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

type BootstrapModal = any;

@Component({
  selector: 'app-update-board',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-board.component.html',
  styleUrl: './update-board.component.css'
})

export class UpdateBoardComponent {
  @Input() title = '';
  @Input() boardId!: number;
  @Output() confirm = new EventEmitter<UpdateBoardRequest>();

  @ViewChild('modalElement') modalElement!: ElementRef;
  private modalInstance?: BootstrapModal;
  private isBrowser: boolean;

  boardTitleControl = new FormControl('');

  constructor(@Inject(PLATFORM_ID) private platformId:Object) {
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
  
    async show(boardId: number, title: string) {
      if (this.isBrowser) {
        if (!this.modalInstance) {
          await this.initializeModal();
        }
        this.boardTitleControl.reset();
        this.boardId = boardId;
        this.title = title;
        this.modalInstance?.show();
      }
    }
  
    hide() {
      if (this.isBrowser) {
        this.modalInstance?.hide();
      }
    }
  
    onConfirm() {
      var updateBoardRequest: UpdateBoardRequest = {id:this.boardId, title: this.boardTitleControl.value || '' };
      console.log('Emitting update:', updateBoardRequest);
      this.confirm.emit(updateBoardRequest);
    }
  
    ngOnDestroy() {
      if (this.isBrowser && this.modalInstance) {
        this.modalInstance.dispose();
      }
    }
}
