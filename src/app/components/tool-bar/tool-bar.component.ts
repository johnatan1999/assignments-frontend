import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators'
import { NavigationEnd, Router } from '@angular/router';
import { UrlService } from 'src/app/shared/services/url.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  @Input() title: String;
  showBackButton: Boolean;

  constructor(private _location: Location,
    private router: Router) { 
    }
    
  ngOnInit(): void {
    this.showBackButton = UrlService.getPreviousUrl() != null;
  }

  onClickBackButton() {
    this._location.back();
  }

}
