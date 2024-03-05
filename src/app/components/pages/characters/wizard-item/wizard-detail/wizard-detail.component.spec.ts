import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardDetailComponent } from './wizard-detail.component';

describe('WizardDetailComponent', () => {
  let component: WizardDetailComponent;
  let fixture: ComponentFixture<WizardDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardDetailComponent]
    });
    fixture = TestBed.createComponent(WizardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
