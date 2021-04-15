import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
  yesButton: String | 'Oui';
  noButton: String | 'Non';
  title: String;
  message: String | 'Confirmer ?';
  onConfirm: Function | (() => {});
  onAbort: Function | (() => {});
  object: any;
  attribute: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  target: String;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
      if(data.object)
        this.target = data.object[data.attribute];
    }


  onCancel() {
    if(this.data.onAbort)
      this.data.onAbort();
    this.dialogRef.close();
  }
  
  onConfirm() {
    if(this.data.onConfirm)
      this.data.onConfirm();
    this.dialogRef.close();
  }

}
