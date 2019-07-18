import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApisComponent } from './apis.component';
import { ApiDefaultComponent } from './api-default/api-default.component';
import { WeatherComponent } from './api-list/weather/weather.component';

const routes: Routes = [
  {
    path: '',
    component: ApisComponent,
    children: [
      { path: '', component: ApiDefaultComponent },
      { path: ':name', component: WeatherComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApisRoutingModule {}
