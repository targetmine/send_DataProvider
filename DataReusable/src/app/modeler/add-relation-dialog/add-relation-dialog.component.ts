import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-relation-dialog',
  templateUrl: './add-relation-dialog.component.html',
  styleUrls: ['./add-relation-dialog.component.css']
})
export class AddRelationDialogComponent{
	protected input: any;
	protected eles: string[];
	protected atts: string[] = [];

	protected trgElement: FormControl = new FormControl('', Validators.required);
	protected trgAttribute: FormControl = new FormControl('', Validators.required);
	protected cardinality: FormControl = new FormControl('', Validators.required);

  constructor(
		public dialogRef: MatDialogRef<AddRelationDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { 
		this.input = data.targets;
		console.log(this.input);
		this.eles = this.input.map((v:any) => v.name);
		console.log(this.eles);
		
	}

	refreshAtts(ele: string){
		for(const v of this.input){
			if(v['name'] === ele){
				this.atts = v['attributes'];
				return;
			}
		}
	}

	onCancel(): void{

	}

	onSubmit(): void{
		this.dialogRef.close({
			element: this.trgElement.value,
			attribute: this.trgAttribute.value,
			cardinality: this.cardinality.value
		});
	}
}
