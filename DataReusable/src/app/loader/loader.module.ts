import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoaderComponent } from './data-loader/data-loader.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
		DataLoaderComponent,
	],
  imports: [
    CommonModule,
		SharedModule,
		MatToolbarModule,
		MatMenuModule,
		MatButtonModule,
  ]
})
export class LoaderModule { }
