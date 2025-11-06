import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOver } from './game-over';

describe('GameOver component', () => {
  let component: GameOver;
  let fixture: ComponentFixture<GameOver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOver],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(GameOver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Game Over message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h5')?.textContent).toContain('GAME OVER');
  });

  it('should emit Play Again on button click', () => {
    spyOn(component, 'emitPlayAgain');

    let button = fixture.nativeElement.querySelector('button');

    button.click();

    expect(component.emitPlayAgain).toHaveBeenCalled();
  });
});
