import { Component, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameStore } from '../../store/game.store';

@Component({
  selector: 'attack-action',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  templateUrl: './attack-action.html',
})
export class AttackAction {
  store = inject(GameStore);

  constructor(private elementRef: ElementRef) {}

  emitFight(): void {
    const event: CustomEvent = new CustomEvent('onFight', {
      bubbles: true,
    });

    this.elementRef.nativeElement.dispatchEvent(event);
  }

  emitRunAway(): void {
    const event: CustomEvent = new CustomEvent('onRunAway', {
      bubbles: true,
    });

    this.elementRef.nativeElement.dispatchEvent(event);
  }
}
