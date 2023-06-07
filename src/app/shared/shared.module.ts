import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelDisplayComponent, RemoveElementDialogComponent } from './components/model-display/model-display.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
		ModelDisplayComponent,
		RemoveElementDialogComponent
	],
  imports: [
    CommonModule,
		MatTableModule,
		MatIconModule,
		MatButtonModule,
		MatTooltipModule,
  ],
	exports: [
		ModelDisplayComponent
	]

})
export class SharedModule { }
