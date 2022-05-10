import { Component,AfterViewInit } from '@angular/core';
import { ModalService } from './modal.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent<T> {
  display = true;
  dataIn = undefined;

  constructor(private modalService: ModalService<T>) {
  }

  async close(): Promise<void> {
    this.display = false;

    setTimeout(async () => {
      await this.modalService.close();
    }, 300);
  }
}