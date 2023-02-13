import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddItemDialogComponent } from "./add-item-dialog.component";
import { ModelerModule } from '../modeler.module';

describe('AddAttributeDialogComponent', () => {
  let component: AddItemDialogComponent;
  let fixture: ComponentFixture<AddItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
			imports: [ ModelerModule ],
      declarations: [ AddItemDialogComponent ],
			providers: [
				{ provide: MatDialogRef, useValue: {} },
				{ provide: MAT_DIALOG_DATA, useValue: [] }
			]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
