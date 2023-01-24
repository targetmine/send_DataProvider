import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelationDialogComponent } from './add-relation-dialog.component';

describe('AddRelationDialogComponent', () => {
  let component: AddRelationDialogComponent;
  let fixture: ComponentFixture<AddRelationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRelationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRelationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
