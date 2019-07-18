import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-api-list-item',
  templateUrl: './api-list-item.component.html',
  styleUrls: ['./api-list-item.component.css']
})
export class ApiListItemComponent implements OnInit {
  @Input() id: number;

  constructor() {}

  ngOnInit() {}
}
