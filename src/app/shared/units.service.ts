import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  unitsChanged = new BehaviorSubject<string>('si');

  constructor() {}
}
