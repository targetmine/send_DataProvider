import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadItemDialogComponent } from './upload-item-dialog.component';

describe('UploadItemDialogComponent', () => {
  let component: UploadItemDialogComponent;
  let fixture: ComponentFixture<UploadItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadItemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
