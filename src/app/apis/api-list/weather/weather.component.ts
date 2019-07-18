import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WeatherService } from '../weather.service';
import { WeatherDetail } from './weather-detail.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  id: number;
  weatherForecast: WeatherDetail[];

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
    this.weatherService.fetchWeather().subscribe(weatherForecast => {
      this.weatherForecast = weatherForecast;
      console.log(this.weatherForecast);
    });
  }
}
