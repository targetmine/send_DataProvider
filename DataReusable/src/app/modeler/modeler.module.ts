import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModelBuilderComponent } from "./model-builder/model-builder.component";
import { ModelDisplayComponent, RemoveElementDialogComponent } from "./model-display/model-display.component";
import { ElementRenameDialogComponent } from './element-rename-dialog/element-rename-dialog.component';
import { AddAttributeDialogComponent } from './add-attribute-dialog/add-attribute-dialog.component';
import { AddRelationDialogComponent } from './add-relation-dialog/add-relation-dialog.component';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
	declarations: [
		ModelBuilderComponent,
		ModelDisplayComponent,
	  ElementRenameDialogComponent,
   	AddAttributeDialogComponent,
    AddRelationDialogComponent,
		RemoveElementDialogComponent
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
		MatCheckboxModule,
		MatSnackBarModule,
		MatIconModule,
		MatDialogModule,
		MatTooltipModule,
		BrowserAnimationsModule
	],
	exports: [
		ModelDisplayComponent
	]
})
export class ModelerModule { }