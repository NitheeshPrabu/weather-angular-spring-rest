import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Forecast } from './forecast.model';
import { LocationService } from '../location.service';
import { Subscription } from 'rxjs';
import { UnitsService } from 'src/app/shared/units.service';

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

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private unitsService: UnitsService,
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

  ngOnDestroy() {
    this.locationServiceSub.unsubscribe();
    this.weatherServiceSub.unsubscribe();
    this.unitSub.unsubscribe();
  }
}
