import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGame } from './start-game';

describe('StartGame component', () => {
  let component: StartGame;
  let fixture: ComponentFixture<StartGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartGame],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(StartGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Start Game button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('Start Game');
  });

  it('should emit Start Game on button click', () => {
    spyOn(component, 'emitStartGame');

    const button = fixture.nativeElement.querySelector('button');

    button.click();

    expect(component.emitStartGame).toHaveBeenCalled();
  });
});
