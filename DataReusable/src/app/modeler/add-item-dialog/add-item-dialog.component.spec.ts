import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AddItemDialogComponent } from "./add-item-dialog.component";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelerModule } from '../modeler.module';
import { MatButtonHarness } from '@angular/material/button/testing';


describe('AddAttributeDialogComponent: Element addition', () => {
  let component: AddItemDialogComponent;
  let fixture: ComponentFixture<AddItemDialogComponent>;
	let loader: HarnessLoader;
	
	const MatDialogRefMock = {
		close: () => {}
	};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
			imports: [ ModelerModule ],
      declarations: [ AddItemDialogComponent ],
			providers: [
				{ 
					provide: MatDialogRef, 
					useValue: MatDialogRefMock },
				{ 
					provide: MAT_DIALOG_DATA, 
					useValue: {
						type: 'Element'
				 	}
				}
			]
    }).compileComponents();

    fixture = TestBed.createComponent(AddItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
		loader = TestbedHarnessEnvironment.loader(fixture);
  });

	afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
		expect(component.itemType).toBe('Element');
  });

	it('should provide an input field for name', () => {
		const nameInput = fixture.nativeElement.querySelector('input');
		expect(nameInput).toBeTruthy();
	});

	it('should bind the input to the form control for name', () => {
		const nameInput = fixture.nativeElement.querySelector('input');
		const event = new Event('input');
		nameInput.value = 'test';
		nameInput.dispatchEvent(event);
		expect(component.elementForm.get('name')?.value).toEqual('test');
	});

	it('should enable submit only on valid name', async() => {
		let submit = await loader.getHarness(MatButtonHarness.with({selector:'button#elementSubmit'}));
		expect(await submit.isDisabled()).toBeTruthy();
		
		component.elementForm.setValue({name: 'validName'});
		component.elementForm.updateValueAndValidity();
		submit = await loader.getHarness(MatButtonHarness.with({selector:'button#elementSubmit'}));
		expect(await submit.isDisabled()).toBeFalsy();
	});

	it('should return unidentified on cancel', async() => {
		let cancelSpy = spyOn(component, 'onCancel').and.callThrough();
		let closeSpy = spyOn(component.dialogRef, 'close').and.callThrough();
		let cancel = await loader.getHarness(MatButtonHarness.with({selector: 'button#cancel'}));
		await cancel.click();
		expect(cancelSpy).toHaveBeenCalledTimes(1);
		expect(closeSpy).toHaveBeenCalledOnceWith(undefined);
	});

	it('should return en element with name on submit', async() => {
		component.elementForm.setValue({name: 'validName'});
		component.elementForm.updateValueAndValidity();
		let submitSpy = spyOn(component, 'onSubmit').and.callThrough();
		let closeSpy = spyOn(component.dialogRef, 'close').and.callThrough();
		let submit = await loader.getHarness(MatButtonHarness.with({selector: 'button#elementSubmit'}));
		await submit.click();
		expect(submitSpy).toHaveBeenCalledTimes(1);
		expect(closeSpy).toHaveBeenCalledOnceWith({ name: 'validName', attributes: [] });
	});
});
