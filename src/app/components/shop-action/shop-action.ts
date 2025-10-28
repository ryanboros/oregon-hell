import { Component, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IProduct } from '../../store/game.model';
import { GameStore } from '../../store/game.store';

@Component({
  selector: 'shop-action',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  templateUrl: './shop-action.html',
})
export class ShopAction {
  store = inject(GameStore);

  constructor(private elementRef: ElementRef) {}

  emitLeaveShop(): void {
    const event: CustomEvent = new CustomEvent('onLeaveShop', {
      bubbles: true,
    });

    this.elementRef.nativeElement.dispatchEvent(event);
  }

  emitPurchaseItem(item: IProduct): void {
    const event: CustomEvent = new CustomEvent('onPurchaseItem', {
      bubbles: true,
      detail: item,
    });

    this.elementRef.nativeElement.dispatchEvent(event);
  }
}
