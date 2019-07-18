import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../shared/units.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  units = 'si';

  constructor(private unitsService: UnitsService) {}

  ngOnInit() {}

  setUnits() {
    this.units = this.units === 'si' ? 'us' : 'si';
    this.unitsService.unitsChanged.next(this.units);
  }
}
