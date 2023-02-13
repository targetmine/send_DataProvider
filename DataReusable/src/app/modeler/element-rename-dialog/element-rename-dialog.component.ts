import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-element-rename-dialog',
  templateUrl: './element-rename-dialog.component.html',
  styleUrls: ['./element-rename-dialog.component.css']
})
export class ElementRenameDialogComponent {
	protected type: string = 'Element';
	protected newName: FormControl = new FormControl('', 
		Validators.compose([
			Validators.required,
			Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*')
		])
	);

	constructor(
		public dialogRef: MatDialogRef<ElementRenameDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: string[]
	){
		this.type = data[0];
		this.newName.setValue(data[1]);
	}

	onCancel(): void{
		this.dialogRef.close(undefined);
	}
}
