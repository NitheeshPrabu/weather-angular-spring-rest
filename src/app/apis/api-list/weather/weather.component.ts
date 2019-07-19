import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Forecast } from './forecast.model';
import { LocationService } from '../location.service';
import { Subscription } from 'rxjs';
import { UnitsService } from 'src/app/shared/units.service';
import { City } from '../city/city.model';
import { CityService } from '../city.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  name: string;
  address: string;
  units: string;
  forecasts: Forecast[];
  weatherServiceSub: Subscription;
  locationServiceSub: Subscription;
  unitSub: Subscription;
  forecastChangedSub: Subscription;

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private unitsService: UnitsService,
    private cityService: CityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.name = params.name;
      this.getLocation(this.address);
    });
    this.unitSub = this.unitsService.unitsChanged.subscribe((units: string) => {
      this.units = units;
      this.getLocation(this.address);
    });
    this.forecastChangedSub = this.weatherService.forecastsChanged.subscribe(
      (forecasts: Forecast[]) => {
        this.forecasts = forecasts;
      }
    );
    this.forecasts = this.weatherService.getForecasts();
  }

  onGetLocation(address: HTMLInputElement) {
    this.address = address.value;
    this.getLocation(this.address);
  }

  getLocation(address: string) {
    this.forecasts = [];
    if (this.address != null) {
      this.locationServiceSub = this.locationService
        .getLocation(this.address)
        .subscribe(response => {
          this.weatherServiceSub = this.weatherService
            .fetchWeather(this.name, response.lat, response.long, this.units)
            .subscribe(forecasts => {
              this.forecasts = forecasts;
            });
        });
    }
  }

  onAddCity(address: HTMLInputElement) {
    const cityName = address.value;
    this.locationService.getLocation(cityName).subscribe(response => {
      const city = new City(cityName, response.lat, response.long);
      this.cityService.addCity(city);
    });
  }

  ngOnDestroy() {
    this.locationServiceSub.unsubscribe();
    this.weatherServiceSub.unsubscribe();
    this.unitSub.unsubscribe();
    this.forecastChangedSub.unsubscribe();
  }
}
