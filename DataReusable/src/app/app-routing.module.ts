import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelBuilderComponent } from './modeler/model-builder/model-builder.component';

const routes: Routes = [
	{ path: 'builder', component: ModelBuilderComponent},

	{ path: '', redirectTo: 'builder', pathMatch: 'full'}
];

@NgModule({
  imports: [
		RouterModule.forRoot(routes, {
			anchorScrolling: 'enabled',
			scrollPositionRestoration: 'enabled'
		})
	],
  exports: [RouterModule]
})
export class AppRoutingModule { }
