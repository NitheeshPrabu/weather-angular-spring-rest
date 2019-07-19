import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Forecast } from '../forecast.model';
import { UnitsService } from 'src/app/shared/units.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit, OnDestroy {
  name: string;
  @Input() forecast: Forecast;
  tempUnit: string;
  windUnit: string;
  unitsSub: Subscription;

  constructor(private unitsService: UnitsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.name = params.name;
    });
    this.unitsSub = this.unitsService.unitsChanged.subscribe((units: string) => {
      switch (units) {
        case 'si':
          this.tempUnit = 'C';
          this.windUnit = 'kmh';
          break;
        case 'us':
          this.tempUnit = 'F';
          this.windUnit = 'mph';
          break;
      }
    });
  }

  ngOnDestroy() {
    this.unitsSub.unsubscribe();
  }
}
