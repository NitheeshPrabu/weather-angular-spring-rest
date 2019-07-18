import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApisComponent } from './apis.component';
import { ApiListComponent } from './api-list/api-list.component';
import { ApiDefaultComponent } from './api-default/api-default.component';
import { ApisRoutingModule } from './apis-routing.module';
import { WeatherComponent } from './api-list/weather/weather.component';
import { WeatherItemComponent } from './api-list/weather/weather-item/weather-item.component';
import { ApiListItemComponent } from './api-list-item/api-list-item.component';

@NgModule({
  declarations: [
    ApisComponent,
    ApiListComponent,
    ApiDefaultComponent,
    WeatherComponent,
    WeatherComponent,
    WeatherItemComponent,
    ApiListItemComponent
  ],
  imports: [CommonModule, FormsModule, ApisRoutingModule]
})
export class ApisModule {}
