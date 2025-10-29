import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'game-win',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  templateUrl: './game-win.html',
})
export class GameWin {
  constructor(private elementRef: ElementRef) {}

  emitPlayAgain(): void {
    const event: CustomEvent = new CustomEvent('onPlayAgain', {
      bubbles: true,
    });

    this.elementRef.nativeElement.dispatchEvent(event);
  }
}
