import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyareaComponent } from './myarea.component';

describe('MyareaComponent', () => {
  let component: MyareaComponent;
  let fixture: ComponentFixture<MyareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyareaComponent]
    });
    fixture = TestBed.createComponent(MyareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
