import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Forecast } from './weather/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  fetchWeather(id: number, lat: number, long: number) {
    switch (id) {
      case 1:
        return this.fetchWeatherFromDarkSky(lat, long);
        break;
      case 2:
        return this.fetchWeatherFromDarkSky2(lat, long);
        break;
      case 3:
        return this.fetchWeatherFromDarkSky3(lat, long);
        break;
    }
  }

  fetchWeatherFromDarkSky(lat: number, long: number) {
    return this.http
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/48000055c67428cf36ea0be23e1220bd/${lat},${long}`
      )
      .pipe(
        map(response => {
          return response['daily']['data'].splice(0, 5).map(day => {
            return new Forecast(
              day['icon'].split('-').join(' '),
              day['temperatureMax'],
              day['temperatureMin'],
              day['humidity'],
              day['precipProbability']
            );
          });
        })
      );
  }

  fetchWeatherFromDarkSky2(lat: number, long: number) {
    return this.http
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/48000055c67428cf36ea0be23e1220bd/${lat},${long}`
      )
      .pipe(
        map(response => {
          return response['daily']['data'].splice(0, 5).map(day => {
            return new Forecast(
              day['icon'].split('-').join(' '),
              day['temperatureMax'],
              day['temperatureMin'],
              day['humidity'],
              day['precipProbability']
            );
          });
        })
      );
  }

  fetchWeatherFromDarkSky3(lat: number, long: number) {
    return this.http
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/48000055c67428cf36ea0be23e1220bd/${lat},${long}`
      )
      .pipe(
        map(response => {
          return response['daily']['data'].splice(0, 5).map(day => {
            return new Forecast(
              day['icon'].split('-').join(' '),
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
