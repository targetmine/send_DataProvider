import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModelBuilderComponent } from "./model-builder/model-builder.component";
import { ElementRenameDialogComponent } from './element-rename-dialog/element-rename-dialog.component';
import { AddAttributeDialogComponent } from './add-attribute-dialog/add-attribute-dialog.component';
import { AddRelationDialogComponent } from './add-relation-dialog/add-relation-dialog.component';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { SharedModule } from "../shared/shared.module";


@NgModule({
	declarations: [
		ModelBuilderComponent,
		ElementRenameDialogComponent,
   	AddAttributeDialogComponent,
    AddRelationDialogComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatInputModule,
		MatButtonModule,
		MatCheckboxModule,
		MatSnackBarModule,
		MatDialogModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatMenuModule
	]
})
export class ModelerModule { }