import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoaderComponent } from './data-loader/data-loader.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
		DataLoaderComponent,
	],
  imports: [
    CommonModule,
		MatToolbarModule,
		MatMenuModule,
		MatButtonModule,
  ]
})
export class LoaderModule { }
