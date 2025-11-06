import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEvents } from './game-events';
import { GameStore } from '../../store/game.store';
import { IMessage } from '../../store/game.model';

describe('GameEvents component', () => {
  let component: GameEvents;
  let fixture: ComponentFixture<GameEvents>;
  let gameStore = {
    messages: signal(new Array<IMessage>()),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameEvents],
      providers: [provideZonelessChangeDetection(), { provide: GameStore, useValue: gameStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(GameEvents);
    const store = TestBed.inject(GameStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty list', () => {
    const li = fixture.nativeElement.querySelector('li');
    expect(li).toBeNull();
  });

  it('should display a message in the list', () => {
    gameStore.messages.set([
      {
        currentDay: 0,
        id: '1234',
        message: 'Lorem Ipsum',
        type: 'NEUTRAL',
      },
    ]);
    fixture.detectChanges();

    const li = fixture.nativeElement.querySelector('li');
    expect(li).toBeTruthy();
    expect(li?.textContent).toContain('Day 0: Lorem Ipsum');
  });

  it('should display multiple messages in with appropriate color', () => {
    const msg: IMessage[] = [
      { currentDay: 1, id: '1234', message: 'Neutral Message', type: 'NEUTRAL' },
      { currentDay: 2, id: '2345', message: 'Negative Message', type: 'NEGATIVE' },
      { currentDay: 3, id: '3456', message: 'Gold Message', type: 'GOLD' },
      { currentDay: 4, id: '4567', message: 'Positive Message', type: 'POSITIVE' },
      { currentDay: 5, id: '5678', message: 'Death Message', type: 'DEATH' },
    ];
    gameStore.messages.set(msg);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('li').length).toEqual(5);

    const li1 = fixture.nativeElement.querySelector('li:nth-of-type(1)');
    expect(li1.classList).toContain('text-slate-400');
    expect(li1?.textContent).toContain('Day 1: Neutral Message');

    const li2 = fixture.nativeElement.querySelector('li:nth-of-type(2)');
    expect(li2.classList).toContain('text-red-600');
    expect(li2?.textContent).toContain('Day 2: Negative Message');

    const li3 = fixture.nativeElement.querySelector('li:nth-of-type(3)');
    expect(li3.classList).toContain('text-yellow-600');
    expect(li3?.textContent).toContain('Day 3: Gold Message');

    const li4 = fixture.nativeElement.querySelector('li:nth-of-type(4)');
    expect(li4.classList).toContain('text-emerald-600');
    expect(li4?.textContent).toContain('Day 4: Positive Message');

    const li5 = fixture.nativeElement.querySelector('li:nth-of-type(5)');
    expect(li5.classList).toContain('text-black');
    expect(li5?.textContent).toContain('Day 5: Death Message');
  });
});
