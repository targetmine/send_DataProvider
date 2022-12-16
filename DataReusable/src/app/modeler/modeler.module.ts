import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModelBuilderComponent } from "./model-builder/model-builder.component";
import { ElementRenameDialog, ModelDisplayComponent } from "./model-display/model-display.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
	declarations: [
		ModelBuilderComponent,
		ModelDisplayComponent,
		ElementRenameDialog,
	],
	imports: [
		CommonModule,
		FormsModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatTableModule,
		MatSelectModule,
		MatInputModule,
		MatButtonModule,
		MatSnackBarModule,
		MatCheckboxModule,
		MatIconModule,
		MatButtonModule,
		MatDialogModule,
	],
	exports: [
		ModelDisplayComponent
	]
})
export class ModelerModule { }