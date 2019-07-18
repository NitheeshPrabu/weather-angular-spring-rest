import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocation(address: string) {
    return this.http
      .get(`https://us1.locationiq.com/v1/search.php?key=c307cabca7ff12&q=${address}&format=json`)
      .pipe(
        map(response => {
          return { lat: response[0].lat, long: response[0].lon };
        })
      );
  }
}
