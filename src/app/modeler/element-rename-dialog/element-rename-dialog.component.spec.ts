import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ElementRenameDialogComponent } from './element-rename-dialog.component';
import { ModelerModule } from '../modeler.module';

describe('ElementRenameDialogComponent', () => {
  let component: ElementRenameDialogComponent;
  let fixture: ComponentFixture<ElementRenameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
			imports: [ ModelerModule ],
      declarations: [ ElementRenameDialogComponent ],
			providers: [ 
				{ provide: MatDialogRef, useValue: {} },
				{ provide: MAT_DIALOG_DATA, useValue: [] }
			]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementRenameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
