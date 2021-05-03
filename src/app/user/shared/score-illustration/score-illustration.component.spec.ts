import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreIllustrationComponent } from './score-illustration.component';

describe('ScoreIllustrationComponent', () => {
  let component: ScoreIllustrationComponent;
  let fixture: ComponentFixture<ScoreIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreIllustrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
