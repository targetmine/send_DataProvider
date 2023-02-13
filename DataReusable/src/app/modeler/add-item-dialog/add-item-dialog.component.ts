import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Element } from 'src/app/shared/models/element';
import { Attribute, ATTRIBUTE_TYPES } from 'src/app/shared/models/attribute';
import { CARDINALITY } from 'src/app/shared/models/relation';

@Component({
	selector: 'app-add-item-dialog',
	templateUrl: './add-item-dialog.component.html',
	styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent {
	
	
	protected itemType: 'Element' | 'Attribute' | 'Relation' = 'Element';
	
	protected elementForm = new FormGroup({
		name: new FormControl('',
			Validators.compose([
				Validators.required,
				Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*')
		]))
	});
	
	protected attributeTypes = ATTRIBUTE_TYPES;
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

	protected cardinalities = CARDINALITY;
	protected eles!: string[];
	protected atts: string[] = [];
	protected relationForm = new FormGroup({
		trgElement: new FormControl<string|null>(null, Validators.required),
		trgAttribute: new FormControl('', Validators.required),
		cardinality: new FormControl('', Validators.required)
	})

	constructor(
		public dialogRef: MatDialogRef<AddItemDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { 
		this.itemType = data.type;
		if( this.itemType === 'Relation' )
			this.eles = this.data.targets.map((v:any) => v.name);
	}

	refreshAtts(ele: string){
		for(const v of this.data.targets){
			if(v['name'] === ele){
				this.atts = v['attributes'];
				return;
			}
		}
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
				});
				break;
			
			case 'Attribute':
				this.dialogRef.close({
					name: this.attributeForm.get('name')?.value,
					type: this.attributeForm.get('type')?.value,
					unique: this.attributeForm.get('unique')?.value
				});
				break;
			
			case 'Relation':
				this.dialogRef.close({
					element: this.relationForm.get('trgElement')?.value,
					attribute: this.relationForm.get('trgAttribute')?.value,
					cardinality: this.relationForm.get('cardinality')?.value
				});
				break;
		}
	}
}


