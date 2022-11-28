import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParserModule } from './parser/parser.module';
import { ModelerModule } from './modeler/modeler.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
		HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ParserModule,
		ModelerModule,
    BrowserAnimationsModule,
		MatTabsModule,
  ]
})
export class AppModule { }
