import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from './city/city.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  public cities: City[] = [];
  public cityChanged = new Subject<City[]>();

  constructor(private http: HttpClient) {}

  public getCities() {
    return this.cities.slice();
  }

  public setCities(cities: City[]) {
    this.cities = cities;
    this.cityChanged.next(this.cities.slice());
  }

  public addCity(city: City) {
    this.http.post<City>('http://localhost:8080/add', city).subscribe(response => {
      this.cities.push(response);
      this.cityChanged.next(this.cities.slice());
    });
  }

  public deleteCity(cityName: string) {
    this.http.delete(`http://localhost:8080/del/${cityName}`).subscribe(response => {
      this.cities = this.cities.filter(city => city.name !== cityName);
      this.cityChanged.next(this.cities.slice());
    });
  }

  fetchCities() {
    return this.http.get<City[]>('http://localhost:8080/all');
  }
}
