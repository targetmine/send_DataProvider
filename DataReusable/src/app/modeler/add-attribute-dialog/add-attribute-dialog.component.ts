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
			{ 
				name: this.attName.value, 
				type: this.attType.value, 
				unique: this.unique.value
			} as unknown as Attribute
		);
	}
}
