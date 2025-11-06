import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStats } from './game-stats';
import { GameStore } from '../../store/game.store';

describe('GameStats component', () => {
  let component: GameStats;
  let fixture: ComponentFixture<GameStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameStats],
      providers: [provideZonelessChangeDetection(), GameStore],
    }).compileComponents();

    fixture = TestBed.createComponent(GameStats);
    const store = TestBed.inject(GameStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the current day in the stats table', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('tr:nth-of-type(1) td:nth-of-type(1)')?.textContent).toContain(
      'DAY'
    );
    expect(compiled.querySelector('tr:nth-of-type(1) td:nth-of-type(2)')?.textContent).toContain(
      '0'
    );
  });

  it('should render the current distance in the stats table', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('tr:nth-of-type(2) td:nth-of-type(1)')?.textContent).toContain(
      'DISTANCE'
    );
    expect(compiled.querySelector('tr:nth-of-type(2) td:nth-of-type(2)')?.textContent).toContain(
      '0'
    );
  });

  it('should render the current crew in the stats table', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('tr:nth-of-type(3) td:nth-of-type(1)')?.textContent).toContain(
      'CREW'
    );
    expect(compiled.querySelector('tr:nth-of-type(3) td:nth-of-type(2)')?.textContent).toContain(
      '30'
    );
  });

  it('should render the current food in the stats table', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('tr:nth-of-type(4) td:nth-of-type(1)')?.textContent).toContain(
      'FOOD'
    );
    expect(compiled.querySelector('tr:nth-of-type(4) td:nth-of-type(2)')?.textContent).toContain(
      '80'
    );
  });

  it('should render the current oxen in the stats table', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('tr:nth-of-type(5) td:nth-of-type(1)')?.textContent).toContain(
      'OXEN'
    );
    expect(compiled.querySelector('tr:nth-of-type(5) td:nth-of-type(2)')?.textContent).toContain(
      '2'
    );
  });

  it('should render the current money in the stats table', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('tr:nth-of-type(6) td:nth-of-type(1)')?.textContent).toContain(
      'MONEY'
    );
    expect(compiled.querySelector('tr:nth-of-type(6) td:nth-of-type(2)')?.textContent).toContain(
      '300'
    );
  });

  it('should render the current firepower in the stats table', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('tr:nth-of-type(7) td:nth-of-type(1)')?.textContent).toContain(
      'FIREPOWER'
    );
    expect(compiled.querySelector('tr:nth-of-type(7) td:nth-of-type(2)')?.textContent).toContain(
      '2'
    );
  });

  it('should render the current weight & capacity in the stats table', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('tr:nth-of-type(8) td:nth-of-type(1)')?.textContent).toContain(
      'WEIGHT / CAPACITY'
    );
    expect(compiled.querySelector('tr:nth-of-type(8) td:nth-of-type(2)')?.textContent).toContain(
      '58 / 100'
    );
  });
});
