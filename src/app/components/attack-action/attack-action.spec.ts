import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AttackAction } from './attack-action';
import { GameStore } from '../../store/game.store';
import { MockBanditStats } from '../../lib/game.mock';

describe('Attack Action component', () => {
  let component: AttackAction;
  let fixture: ComponentFixture<AttackAction>;
  let gameStore = { banditStats: signal(MockBanditStats) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttackAction],
      providers: [provideZonelessChangeDetection(), { provide: GameStore, useValue: gameStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(AttackAction);
    const store = TestBed.inject(GameStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Attack Action', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h5')?.textContent).toContain('Bandits attack');
    expect(compiled.querySelector('p')?.textContent).toContain('Firepower: 4');
  });

  it('should emit Fight on button click', () => {
    spyOn(component, 'emitFight');

    const button = fixture.debugElement.query(By.css('[data-testid="fight-button"]')).nativeElement;

    button.click();

    expect(component.emitFight).toHaveBeenCalled();
  });

  it('should emit Run Away on button click', () => {
    spyOn(component, 'emitRunAway');

    const button = fixture.debugElement.query(By.css('[data-testid="run-button"]')).nativeElement;

    button.click();

    expect(component.emitRunAway).toHaveBeenCalled();
  });
});
