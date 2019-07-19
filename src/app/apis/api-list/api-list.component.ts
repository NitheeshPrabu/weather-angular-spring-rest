import { Component, OnInit, OnDestroy } from '@angular/core';
import { CityService } from './city.service';
import { City } from './city/city.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css']
})
export class ApiListComponent implements OnInit, OnDestroy {
  cities: City[];
  citySub: Subscription;
  cityChangedSub: Subscription;

  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.cityChangedSub = this.cityService.cityChanged.subscribe((cities: City[]) => {
      this.cities = cities;
    });
    this.cities = this.cityService.getCities();
  }

  ngOnDestroy() {
    this.cityChangedSub.unsubscribe();
  }
}
