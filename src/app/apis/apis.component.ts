import { Component, OnInit, OnDestroy } from '@angular/core';
import { CityService } from './api-list/city.service';
import { Subscription } from 'rxjs';
import { City } from './api-list/city/city.model';

@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.css']
})
export class ApisComponent implements OnInit, OnDestroy {
  citySub: Subscription;

  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.citySub = this.cityService.fetchCities().subscribe((cities: City[]) => {
      this.cityService.setCities(cities);
    });
  }

  ngOnDestroy() {
    this.citySub.unsubscribe();
  }
}
