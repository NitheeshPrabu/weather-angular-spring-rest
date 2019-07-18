import { Component, OnInit, Input } from '@angular/core';
import { WeatherDetail } from '../weather-detail.model';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit {
  @Input() weatherDetail: WeatherDetail;

  constructor() {}

  ngOnInit() {}
}
