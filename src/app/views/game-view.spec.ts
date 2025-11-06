import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameView } from './game-view';

describe('Game View component', () => {
  let component: GameView;
  let fixture: ComponentFixture<GameView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameView],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(GameView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Game View', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Oregon Hell');
  });
});
