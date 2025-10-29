export interface IGameState {
  banditStats: IBanditStats;
  currentEvent: EventType;
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
  stat?: ItemType;
  text: string;
  value?: number;
}

export interface IProduct {
  id: string;
  item: ItemType;
  price: number;
  qty: number;
}

export const ATTACK_EVENT = 'ATTACK' as const;
export const GAME_OVER_EVENT = 'GAME-OVER' as const;
export const SHOP_EVENT = 'SHOP' as const;
export const STAT_CHANGE_EVENT = 'STAT-CHANGE' as const;
export const WIN_EVENT = 'WIN' as const;

export type EventType =
  | ''
  | typeof ATTACK_EVENT
  | typeof GAME_OVER_EVENT
  | typeof SHOP_EVENT
  | typeof STAT_CHANGE_EVENT
  | typeof WIN_EVENT;

export const CREW_ITEM = 'crew' as const;
export const FIREPOWER_ITEM = 'firepower' as const;
export const FOOD_ITEM = 'food' as const;
export const MONEY_ITEM = 'money' as const;
export const OXEN_ITEM = 'oxen' as const;

export type ItemType =
  | typeof CREW_ITEM
  | typeof FIREPOWER_ITEM
  | typeof FOOD_ITEM
  | typeof MONEY_ITEM
  | typeof OXEN_ITEM;

export const POSITIVE_MESSAGE = 'POSITIVE' as const;
export const NEUTRAL_MESSAGE = 'NEUTRAL' as const;
export const NEGATIVE_MESSAGE = 'NEGATIVE' as const;
export const GOLD_MESSAGE = 'GOLD' as const;

export type NotificationType =
  | typeof NEGATIVE_MESSAGE
  | typeof NEUTRAL_MESSAGE
  | typeof POSITIVE_MESSAGE
  | typeof GOLD_MESSAGE;
