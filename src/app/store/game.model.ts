export interface IGameState {
  currentEvent: string;
  isGameActive: boolean;
  messages: IMessage[];
  stats: IStats;
}

export interface IMessage {
  currentDay: number;
  id: string;
  message: string;
  type: string;
}

export interface IStats {
  crew: number;
  day: number;
  distance: number;
  firepower: number;
  food: number;
  money: number;
  oxen: number;
  [key: string]: number;
}
