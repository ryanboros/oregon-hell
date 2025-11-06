import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { JourneyProgress } from './journey-progress';
import { GameStore } from '../../store/game.store';
import { MockStats } from '../../lib/game.mock';

describe('JourneyProgress component', () => {
  let component: JourneyProgress;
  let fixture: ComponentFixture<JourneyProgress>;
  let gameStore = { progress: signal(0) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyProgress],
      providers: [provideZonelessChangeDetection(), { provide: GameStore, useValue: gameStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(JourneyProgress);
    const store = TestBed.inject(GameStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have input range value of 0', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const el = input.nativeElement;

    expect(el.value).toBe('0');
  });

  it('should have input range value of 48', () => {
    gameStore.progress.set(50);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    const el = input.nativeElement;

    expect(el.value).toBe('50');
  });
});
