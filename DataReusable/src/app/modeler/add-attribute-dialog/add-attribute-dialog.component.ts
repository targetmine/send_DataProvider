import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Attribute, ATTRIBUTE_TYPES } from 'src/app/shared/models/attribute';

@Component({
  selector: 'app-add-attribute-dialog',
  templateUrl: './add-attribute-dialog.component.html',
  styleUrls: ['./add-attribute-dialog.component.css']
})
export class AddAttributeDialogComponent {
	protected TYPES = ATTRIBUTE_TYPES;

	protected attName: FormControl = new FormControl('',
		Validators.compose([
			Validators.required,
			Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*')
		])
	);

	protected attType: FormControl = new FormControl('string');
	protected unique: FormControl = new FormControl(false);

  constructor(
		public dialogRef: MatDialogRef<AddAttributeDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public element: string
	) { }

	onCancel(): void{
		this.dialogRef.close(undefined);
	}

	onSubmit(): void{
		this.dialogRef.close(
			{ name: this.attName, type: this.attType, unique: this.unique } as unknown as Attribute
		);
	}
  
	
			// /**
	//  * handle the addition of a single attribute to the selected element
	//  * @param event 
	//  */
	// onClickAddAttribute(event:any){
	// 	event.preventDefault();
	// 	if( this.attributeForm.valid ){
	// 		const parent = this.attributeForm.get('selectedElement')?.value;
	// 		const name = this.attributeForm.get('newAttribute')?.value;
	// 		const type = this.attributeForm.get('attributeType')?.value;
	// 		const unique = this.attributeForm.get('isUnique')?.value;
	// 		const newAttr = new Attribute(<AttributeType>type!, unique!);
	// 		this.modelServ.addAttribute(parent!, name!, newAttr);
	// 	}
	// 	else
	// 		this.snackBar.open('Some elements of the attribute definition are invalid', 'Close');

	// }

}
