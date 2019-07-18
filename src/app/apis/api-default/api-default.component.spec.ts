import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDefaultComponent } from './api-default.component';

describe('ApiDefaultComponent', () => {
  let component: ApiDefaultComponent;
  let fixture: ComponentFixture<ApiDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
