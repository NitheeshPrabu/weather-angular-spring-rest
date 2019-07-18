import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  unitsChanged = new BehaviorSubject<string>('si');

  constructor() {}
}
