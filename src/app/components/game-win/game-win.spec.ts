import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWin } from './game-win';

describe('GameWin component', () => {
  let component: GameWin;
  let fixture: ComponentFixture<GameWin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameWin],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(GameWin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render You Win message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h5')?.textContent).toContain('YOU WIN!');
  });

  it('should emit Play Again on button click', () => {
    spyOn(component, 'emitPlayAgain');

    let button = fixture.nativeElement.querySelector('button');

    button.click();

    expect(component.emitPlayAgain).toHaveBeenCalled();
  });
});
