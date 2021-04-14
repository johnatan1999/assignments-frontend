import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursDialogComponent } from './cours-dialog.component';

describe('CoursDialogComponent', () => {
  let component: CoursDialogComponent;
  let fixture: ComponentFixture<CoursDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
