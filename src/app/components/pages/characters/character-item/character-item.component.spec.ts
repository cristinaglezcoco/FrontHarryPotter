import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterItemComponent } from './character-item.component';

describe('CharacterItemComponent', () => {
  let component: CharacterItemComponent;
  let fixture: ComponentFixture<CharacterItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterItemComponent]
    });
    fixture = TestBed.createComponent(CharacterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
