import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatareuseParserComponent } from './parser/datareuse-parser/datareuse-parser.component';

const routes: Routes = [
	{ path: 'parser', component: DatareuseParserComponent},

	{ path: '', redirectTo: 'parser', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
