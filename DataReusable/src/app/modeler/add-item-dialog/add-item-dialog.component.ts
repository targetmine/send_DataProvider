import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Element } from 'src/app/shared/models/element';
import { Attribute, ATTRIBUTE_TYPES } from 'src/app/shared/models/attribute';

@Component({
	selector: 'app-add-item-dialog',
	templateUrl: './add-item-dialog.component.html',
	styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent {
	protected TYPES = ATTRIBUTE_TYPES;
	
	protected itemType: 'Element' | 'Attribute' | 'Relation' = 'Element';
	
	protected elementForm = new FormGroup({
		name: new FormControl('',
			Validators.compose([
				Validators.required,
				Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*')
		]))
	});
	
	protected attributeForm = new FormGroup({
		name: new FormControl('',
			Validators.compose([
				Validators.required,
				Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*')
		])
		),
		type: new FormControl('string', Validators.required),
		unique: new FormControl(false)
	});

	constructor(
		public dialogRef: MatDialogRef<AddItemDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any[]
	) { 
		this.itemType = data[0];
	}

	onCancel(): void {
		this.dialogRef.close(undefined);
	}

	onSubmit(): void {
		switch(this.itemType){
			case 'Element':
				this.dialogRef.close({
					name: this.elementForm.get('name')?.value,
					attributes: []
				} as unknown as Element);
				break;
			
			case 'Attribute':
				this.dialogRef.close({
					name: this.attributeForm.get('name')?.value,
					type: this.attributeForm.get('type')?.value,
					unique: this.attributeForm.get('unique')?.value
				} as unknown as Attribute);
				break;
			
			case 'Relation':
				break;
		}
	}
}


