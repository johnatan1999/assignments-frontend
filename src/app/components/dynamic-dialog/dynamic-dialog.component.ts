import { CdkPortalOutletAttachedRef, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { AfterViewInit, Component, ComponentRef, Inject, Injector, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DynamicDialogData {
  component: any;
  type: string | 'detail';
  assignment: any;
}
@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.css']
})
export class DynamicDialogComponent implements AfterViewInit {

  constructor(public dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DynamicDialogData) {
    }

  ngAfterViewInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

}