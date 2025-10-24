export interface IGameState {
  currentEvent: string;
  isGameActive: boolean;
  messages: IMessage[];
  stats: IStats;
  shopInventory: IProduct[];
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

export interface IEvent {
  type: string;
  notification: string;
  products?: IProduct[];
  stat?: string;
  text: string;
  value?: number;
}

export interface IProduct {
  id: string;
  item: string;
  price: number;
  qty: number;
}
