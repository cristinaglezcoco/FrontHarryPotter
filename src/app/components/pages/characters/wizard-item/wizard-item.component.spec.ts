import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardItemComponent } from './wizard-item.component';

describe('WizardItemComponent', () => {
  let component: WizardItemComponent;
  let fixture: ComponentFixture<WizardItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardItemComponent]
    });
    fixture = TestBed.createComponent(WizardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
