import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GameView } from './views/game-view';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameView],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('oregon-hell');
}
