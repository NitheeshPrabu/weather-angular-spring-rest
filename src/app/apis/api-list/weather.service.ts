import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Forecast } from './weather/forecast.model';

interface DarkSkyForecast {
  icon: string;
  temperatureMax: number;
  temperatureMin: number;
  humidity: number;
  precipIntensityMax: number;
  windSpeed: number;
}

interface Openweather {
  weather: [
    {
      icon: string;
    }
  ];
  main: {
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  dt_txt: string;
}

interface Apixu {
  forecast: {
    forecastday: [
      {
        day: {
          maxtemp_c: number;
          maxtemp_f: number;
          mintemp_c: number;
          mintemp_f: number;
          avgtemp_c: number;
          avgtemp_f: number;
          maxwind_mph: number;
          maxwind_kph: number;
          totalprecip_mm: number;
          totalprecip_in: number;
          avghumidity: number;
          condition: {
            text: string;
            icon: string;
          };
        };
      }
    ];
  };
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
      case 'apixu':
        return this.fetchWeatherFromApixu(lat, long, units);
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
            const imgPath = `/assets/${forecast.icon}.png`;
            return new Forecast(
              imgPath,
              forecast.icon.split('-').join(' '),
              forecast.temperatureMax,
              forecast.temperatureMin,
              forecast.humidity,
              forecast.precipIntensityMax,
              forecast.windSpeed
            );
          });
        })
      );
  }

  mapOpenWeatherIcons(icon: string): string {
    let name: string;
    switch (icon) {
      case '01d':
        name = 'clear-day';
        break;
      case '01n':
        name = 'clear-night';
        break;
      case '02d':
      case '03d':
        name = 'partly-cloudy-day';
        break;
      case '02n':
      case '03n':
        name = 'partly-cloudy-night';
        break;
      case '04d':
      case '04n':
        name = 'cloudy';
        break;
      case '9d':
      case '10d':
        name = 'rain';
        break;
      case '11d':
        name = 'thunderstorm';
        break;
      case '13d':
        name = 'snow';
        break;
    }
    return name;
  }

  fetchWeatherFromOpenweather(lat: number, long: number, units: string) {
    const key = '91a94d849c19052ced5180bf7501af17';
    const u = units === 'si' ? 'metric' : 'imperial';
    return this.http
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=${u}&appid=${key}`
      )
      .pipe(
        map((response: { list }) => {
          return response.list
            .filter((forecast: Openweather) => {
              return forecast.dt_txt.includes('06:00:00');
            })
            .map((forecast: Openweather) => {
              const icon = this.mapOpenWeatherIcons(forecast.weather[0].icon);
              const imgPath = `/assets/${icon}.png`;
              return new Forecast(
                imgPath,
                icon.split('-').join(' '),
                forecast.main.temp_max,
                forecast.main.temp_min,
                forecast.main.humidity,
                null,
                forecast.wind.speed
              );
            });
        })
      );
  }

  fetchWeatherFromApixu(lat: number, long: number, units: string) {
    const key = '0913a30ca74e4ce188c43034191907';
    return this.http
      .get(`https://api.apixu.com/v1/forecast.json?key=${key}&q="${lat},${long}"&days=5`)
      .pipe(
        map((response: Apixu) => {
          return response.forecast.forecastday.map(day => {
            const tempMax = units === 'si' ? day.day.maxtemp_c : day.day.maxtemp_f;
            const tempMin = units === 'si' ? day.day.mintemp_c : day.day.mintemp_f;
            const windSpeed = units === 'si' ? day.day.maxwind_kph : day.day.maxwind_mph;
            const imgPath = 'http:' + day.day.condition.icon.replace('64x64', '128x128');
            return new Forecast(
              imgPath,
              day.day.condition.text,
              tempMax,
              tempMin,
              day.day.avghumidity / 100,
              day.day.totalprecip_in,
              windSpeed
            );
          });
        })
      );
  }
}
