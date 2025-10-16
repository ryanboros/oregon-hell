import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NOTIFICATION_TYPE } from '../../lib/constants';
import { IGameState, IMessage } from '../../store/game.model';
import { selectMessages } from '../../store/game.selectors';

@Component({
  selector: 'game-events',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  templateUrl: './game-events.html',
})
export class GameEvents {
  messages$: Observable<IMessage[]>;
  get notificationTypes() {
    return NOTIFICATION_TYPE;
  }

  constructor(private store: Store<{ game: IGameState }>) {
    this.messages$ = this.store.select(selectMessages);
  }
}
