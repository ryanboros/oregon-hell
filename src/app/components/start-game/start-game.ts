import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'start-game',
  standalone: true,
  imports: [],
  styles: [],
  templateUrl: './start-game.html',
})
export class StartGame {
  constructor(private elementRef: ElementRef) {}

  emitStartGame(): void {
    const event: CustomEvent = new CustomEvent('onStartGame', {
      bubbles: true,
    });

    this.elementRef.nativeElement.dispatchEvent(event);
  }
}
