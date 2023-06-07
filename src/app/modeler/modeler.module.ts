import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModelBuilderComponent, FinishModelDialogComponent } from "./model-builder/model-builder.component";
import { ElementRenameDialogComponent } from './element-rename-dialog/element-rename-dialog.component';
import { AddItemDialogComponent } from "./add-item-dialog/add-item-dialog.component";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { SharedModule } from "../shared/shared.module";


@NgModule({
	declarations: [
		ModelBuilderComponent,
		FinishModelDialogComponent,
		ElementRenameDialogComponent,
		AddItemDialogComponent,
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
		MatDialogModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatMenuModule
	]
})
export class ModelerModule { }