import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseItemComponent } from './house-item.component';

describe('HouseItemComponent', () => {
  let component: HouseItemComponent;
  let fixture: ComponentFixture<HouseItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseItemComponent]
    });
    fixture = TestBed.createComponent(HouseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
