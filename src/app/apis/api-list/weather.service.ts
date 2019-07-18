import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { WeatherDetail } from './weather/weather-detail.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  fetchWeather() {
    return this.http
      .get(
        'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/48000055c67428cf36ea0be23e1220bd/37.8267,-122.4233'
      )
      .pipe(
        map(response => {
          return response['daily']['data'].splice(0, 5).map(day => {
            return new WeatherDetail(
              day['summary'],
              day['temperatureMax'],
              day['temperatureMin'],
              day['humidity'],
              day['precipProbability']
            );
          });
        })
      );
  }
}
