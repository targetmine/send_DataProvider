import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParserComponent } from './parser.component';

function createNewEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = new CustomEvent(eventName, { bubbles,	cancelable} );
  return evt;
}

describe('ParserComponent', () => {
  let component: ParserComponent;
  let fixture: ComponentFixture<ParserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
				ParserComponent 
			],
			imports: [
				FormsModule,
				ReactiveFormsModule,
				MatFormFieldModule,
				MatInputModule,
				MatSelectModule,
				BrowserAnimationsModule
			],
			providers: [
				FormBuilder
			]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it(`shold have an initially empty 'DataModel'`, () => {
		expect(component.dataModel).toEqual([]);
	})

	// file upload form testing
	it(`should update 'fileName' on user input`, fakeAsync(() => {

		fixture.whenStable().then( () =>{
			const input = fixture.debugElement.nativeElement.querySelector('#fileInput');
			input.value = 'testfile.txt';
				
			input.dispatchEvent(new Event('input'));
			fixture.detectChanges();
				
			expect(component.fileForm.value).toEqual({
				fileName: 'otro.txt',
				fileType: 'info'
			})
		})
		
		
		
		// toEqual('testfile.txt');
	}))
});
