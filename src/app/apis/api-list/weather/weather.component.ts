import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Forecast } from './forecast.model';
import { LocationService } from '../location.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  id: number;
  address: string;
  forecasts: Forecast[];

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  getLocation() {
    this.locationService.getLocation(this.address).subscribe(response => {
      this.weatherService
        .fetchWeather(this.id, response.lat, response.long)
        .subscribe(forecasts => {
          this.forecasts = forecasts;
        });
    });
  }
}
