import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type BootstrapModal = any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async createModal(element: HTMLElement): Promise<BootstrapModal | null> {
    if (!this.isBrowser) return null;
    
    const { Modal } = await import('bootstrap');
    return new Modal(element);
  }

  show(modal: BootstrapModal | null) {
    if (this.isBrowser && modal) {
      modal.show();
    }
  }

  hide(modal: BootstrapModal | null) {
    if (this.isBrowser && modal) {
      modal.hide();
      
      setTimeout(() => {
        this.cleanup();
      }, 350);
    }
  }

  cleanup() {
    if (this.isBrowser) {
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }

  dispose(modal: BootstrapModal | null) {
    if (this.isBrowser && modal) {
      modal.dispose();
    }
  }
}