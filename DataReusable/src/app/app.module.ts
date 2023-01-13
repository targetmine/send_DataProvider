import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModelerModule } from './modeler/modeler.module';

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
		ModelerModule,
    MatTabsModule,
  ]
})
export class AppModule { }
