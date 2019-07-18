import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiListItemComponent } from './api-list-item.component';

describe('ApiListItemComponent', () => {
  let component: ApiListItemComponent;
  let fixture: ComponentFixture<ApiListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
