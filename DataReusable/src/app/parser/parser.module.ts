import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';

import { DatareuseParserComponent } from './datareuse-parser/datareuse-parser.component';

@NgModule({
  declarations: [
    DatareuseParserComponent
  ],
  imports: [
    CommonModule,
		MatStepperModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
  ]
})
export class ParserModule { }
