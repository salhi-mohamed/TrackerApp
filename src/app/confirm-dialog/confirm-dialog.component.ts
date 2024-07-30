import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  @Input() data: any; 
  @Output() close = new EventEmitter<boolean>();

  onNoClick(): void {
    this.close.emit(false);
  }

  onYesClick(): void {
    this.close.emit(true);
  }
}
