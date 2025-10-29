export interface IGameState {
  banditStats: IBanditStats;
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

export interface IBanditStats {
  firepower: number;
  money: number;
}

export interface IEvent {
  type: string;
  notification: NotificationType;
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

export const POSITIVE = 'positive' as const;
export const NEUTRAL = 'neutral' as const;
export const NEGATIVE = 'negative' as const;

export type NotificationType = typeof NEGATIVE | typeof NEUTRAL | typeof POSITIVE;
