import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddElevesComponent } from './add-eleves.component';

describe('AddElevesComponent', () => {
  let component: AddElevesComponent;
  let fixture: ComponentFixture<AddElevesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddElevesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddElevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
