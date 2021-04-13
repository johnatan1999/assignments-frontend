import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  visible = true;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.visible = false;
  }
}
