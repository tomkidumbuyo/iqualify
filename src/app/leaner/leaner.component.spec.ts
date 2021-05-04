import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeanerComponent } from './leaner.component';

describe('LeanerComponent', () => {
  let component: LeanerComponent;
  let fixture: ComponentFixture<LeanerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeanerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
