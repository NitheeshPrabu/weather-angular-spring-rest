import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { City } from './city.model';
import { CityService } from '../city.service';
import { WeatherService } from '../weather.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnitsService } from 'src/app/shared/units.service';
import { Forecast } from '../weather/forecast.model';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit, OnDestroy {
  @Input() city: City;
  unitsSub: Subscription;
  weatherSub: Subscription;
  units: string;

  constructor(
    private cityService: CityService,
    private weatherService: WeatherService,
    private unitsService: UnitsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.unitsSub = this.unitsService.unitsChanged.subscribe((units: string) => {
      this.units = units;
      this.onClickCity();
    });
  }

  onClickCity() {
    this.weatherSub = this.weatherService
      .fetchWeather(
        this.route.firstChild.snapshot.params.name,
        this.city.latitude,
        this.city.longitude,
        this.units
      )
      .subscribe((forecasts: Forecast[]) => {
        this.weatherService.setForecasts(forecasts);
      });
  }

  onDeleteCity() {
    this.cityService.deleteCity(this.city.name);
  }

  ngOnDestroy() {
    this.unitsSub.unsubscribe();
    this.weatherSub.unsubscribe();
  }
}
