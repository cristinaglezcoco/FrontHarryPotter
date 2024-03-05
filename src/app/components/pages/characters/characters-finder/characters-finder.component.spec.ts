import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersFinderComponent } from './characters-finder.component';

describe('CharactersFinderComponent', () => {
  let component: CharactersFinderComponent;
  let fixture: ComponentFixture<CharactersFinderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharactersFinderComponent]
    });
    fixture = TestBed.createComponent(CharactersFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
