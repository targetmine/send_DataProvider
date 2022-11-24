import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { ParserComponent } from './parser.component';
import { InfoFileLoaderComponent } from './info-file-loader/info-file-loader.component';

@NgModule({
  declarations: [
    ParserComponent,
    InfoFileLoaderComponent,
  ],
  imports: [
    CommonModule,
		MatStepperModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatSelectModule,
		MatCheckboxModule,
		MatButtonModule,
  ]
})
export class ParserModule { }
