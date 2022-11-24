import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParserModule } from './parser/parser.module';

import { ModelDisplayComponent } from './modeler/model-display/model-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelBuilderComponent } from './modeler/model-builder/model-builder.component';
import { MatTabsModule } from '@angular/material/tabs';

import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
		ModelDisplayComponent,
    ModelBuilderComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
		HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ParserModule,
    BrowserAnimationsModule,
		MatTabsModule,
		MatTableModule,
  ]
})
export class AppModule { }
