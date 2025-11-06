import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ShopAction } from './shop-action';
import { GameStore } from '../../store/game.store';
import { MockProducts } from '../../lib/game.mock';

describe('Shop Action component', () => {
  let component: ShopAction;
  let fixture: ComponentFixture<ShopAction>;
  let gameStore = { shopInventory: signal(MockProducts) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopAction],
      providers: [provideZonelessChangeDetection(), { provide: GameStore, useValue: gameStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopAction);
    const store = TestBed.inject(GameStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Shop Action', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h5')?.textContent).toContain('Trading Post');
  });

  it('should emit Leave Shop on button click', () => {
    spyOn(component, 'emitLeaveShop');

    const button = fixture.debugElement.query(By.css('[data-testid="leave-button"]')).nativeElement;

    button.click();

    expect(component.emitLeaveShop).toHaveBeenCalled();
  });

  it('should emit Purchase Item on button 1 click with selected item data', () => {
    spyOn(component, 'emitPurchaseItem');

    const button = fixture.debugElement.query(
      By.css('[data-testid="purchase-button-1"]')
    ).nativeElement;

    button.click();

    expect(component.emitPurchaseItem).toHaveBeenCalledWith(MockProducts[1]);
  });
});
