import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CARDINALITY } from 'src/app/shared/models/relation';
@Component({
  selector: 'app-add-relation-dialog',
  templateUrl: './add-relation-dialog.component.html',
  styleUrls: ['./add-relation-dialog.component.css']
})
export class AddRelationDialogComponent{
	protected CARDINALITY = CARDINALITY;
	protected eles: string[];
	protected atts: string[] = [];

	protected trgElement: FormControl<string|null> = new FormControl<string|null>(null, Validators.required);
	protected trgAttribute: FormControl = new FormControl('', Validators.required);
	protected cardinality: FormControl = new FormControl('', Validators.required);

  constructor(
		public dialogRef: MatDialogRef<AddRelationDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { 
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

	onCancel(): void{
		this.dialogRef.close(undefined);
	}

	onSubmit(): void{
		this.dialogRef.close({
			element: this.trgElement.value,
			attribute: this.trgAttribute.value,
			cardinality: this.cardinality.value
		});
	}
}
