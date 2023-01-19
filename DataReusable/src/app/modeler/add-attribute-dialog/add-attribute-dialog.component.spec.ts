import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddAttributeDialogComponent } from './add-attribute-dialog.component';
import { ModelerModule } from '../modeler.module';

describe('AddAttributeDialogComponent', () => {
  let component: AddAttributeDialogComponent;
  let fixture: ComponentFixture<AddAttributeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
			imports: [ ModelerModule ],
      declarations: [ AddAttributeDialogComponent ],
			providers: [
				{ provide: MatDialogRef, useValue: {} },
				{ provide: MAT_DIALOG_DATA, useValue: [] }
			]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAttributeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
