export interface IGameState {
  crew: number;
  day: number;
  distance: number;
  firepower: number;
  food: number;
  messages: IMessage[];
  money: number;
  oxen: number;
}

export interface IMessage {
  day: number;
  id: string;
  message: string;
  type: string;
}
