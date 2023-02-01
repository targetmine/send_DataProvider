import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoaderComponent } from './data-loader/data-loader.component';



@NgModule({
  declarations: [
		DataLoaderComponent,
	],
  imports: [
    CommonModule
  ]
})
export class LoaderModule { }
