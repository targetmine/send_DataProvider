import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-element-rename-dialog',
  templateUrl: './element-rename-dialog.component.html',
  styleUrls: ['./element-rename-dialog.component.css']
})
export class ElementRenameDialogComponent {
	newName: FormControl = new FormControl('', 
		Validators.compose([
			Validators.required,
			Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*')
		])
	);

	constructor(
		public dialogRef: MatDialogRef<ElementRenameDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public name: string
	){
		this.newName.setValue(name);
	}

	onCancel(): void{
		this.dialogRef.close(undefined);
	}
}
