import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoaderComponent } from './data-loader/data-loader.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { UploadItemDialogComponent } from './upload-item-dialog/upload-item-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
		DataLoaderComponent,
  	UploadItemDialogComponent,
	],
  imports: [
    CommonModule,
		SharedModule,
		MatToolbarModule,
		MatMenuModule,
		MatButtonModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		MatCheckboxModule,
		MatTableModule,
		MatSelectModule,
		MatIconModule,
		MatListModule,
  ]
})
export class LoaderModule { }
