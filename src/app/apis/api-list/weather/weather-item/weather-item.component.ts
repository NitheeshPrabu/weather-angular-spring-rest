import { Component, OnInit, Input } from '@angular/core';
import { Forecast } from '../forecast.model';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit {
  @Input() forecast: Forecast;

  constructor() {}

  ngOnInit() {}
}
