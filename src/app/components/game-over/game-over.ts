import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'game-over',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  templateUrl: './game-over.html',
})
export class GameOver {
  constructor(private elementRef: ElementRef) {}

  emitPlayAgain(): void {
    const event: CustomEvent = new CustomEvent('onPlayAgain', {
      bubbles: true,
    });

    this.elementRef.nativeElement.dispatchEvent(event);
  }
}
