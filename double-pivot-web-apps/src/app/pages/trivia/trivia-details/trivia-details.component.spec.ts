import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaDetailsComponent } from './trivia-details.component';

describe('TriviaDetailsComponent', () => {
  let component: TriviaDetailsComponent;
  let fixture: ComponentFixture<TriviaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriviaDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
