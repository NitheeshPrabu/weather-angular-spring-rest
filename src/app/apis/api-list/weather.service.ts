import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Forecast } from './weather/forecast.model';

interface DarkSkyForecast {
  icon: string;
  temperatureMax: number;
  temperatureMin: number;
  humidity: number;
  precipProbability: number;
  windSpeed: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  fetchWeather(name: string, lat: number, long: number, units: string) {
    switch (name) {
      case 'darksky':
        return this.fetchWeatherFromDarkSky(lat, long, units);
        break;
      case 'openweather':
        return this.fetchWeatherFromOpenweather(lat, long, units);
        break;
      case 'weather2020':
        return this.fetchWeatherFromWeather2020(lat, long, units);
        break;
    }
  }

  fetchWeatherFromDarkSky(lat: number, long: number, units: string) {
    const key = '48000055c67428cf36ea0be23e1220bd';
    return this.http
      .get<{ daily: { data: [] } }>(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${lat},${long}?units=${units}`
      )
      .pipe(
        map(response => {
          return response.daily.data.splice(0, 5).map((forecast: DarkSkyForecast) => {
            return new Forecast(
              forecast.icon,
              forecast.temperatureMax,
              forecast.temperatureMin,
              forecast.humidity,
              forecast.precipProbability,
              forecast.windSpeed
            );
          });
        })
      );
  }

  fetchWeatherFromOpenweather(lat: number, long: number, units: string) {
    const key = '48000055c67428cf36ea0be23e1220bd';
    return this.http
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${lat},${long}?units=${units}`
      )
      .pipe(
        map(response => {
          return response['daily']['data'].splice(0, 5).map(day => {
            return new Forecast(
              day['icon'],
              day['temperatureMax'],
              day['temperatureMin'],
              day['humidity'],
              day['precipProbability'],
              day['windSpeed']
            );
          });
        })
      );
  }

  fetchWeatherFromWeather2020(lat: number, long: number, units: string) {
    const key = '48000055c67428cf36ea0be23e1220bd';
    return this.http
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${lat},${long}?units=${units}`
      )
      .pipe(
        map(response => {
          return response['daily']['data'].splice(0, 5).map(day => {
            return new Forecast(
              day['icon'],
              day['temperatureMax'],
              day['temperatureMin'],
              day['humidity'],
              day['precipProbability'],
              day['windSpeed']
            );
          });
        })
      );
  }
}
