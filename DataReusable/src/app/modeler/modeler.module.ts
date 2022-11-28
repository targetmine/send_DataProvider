import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModelBuilderComponent } from "./model-builder/model-builder.component";
import { ModelDisplayComponent } from "./model-display/model-display.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
	declarations: [
		ModelBuilderComponent,
		ModelDisplayComponent
	],
	imports: [
		CommonModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatTableModule,
		MatSelectModule,
		MatInputModule,
		MatButtonModule,
	],
	exports: [
		ModelDisplayComponent
	]
})
export class ModelerModule { }