export enum TokenState {
  Hidden,
  Revealed,
  Flagged,
}
export enum GameState {
  Started,
  Ended,
  Paused,
  PauseSelecting,
}
export interface Token {
  state: TokenState;
  value: string;
  isIcon?: boolean;
  id: number;
}
export const ICONS = "Icons";
export const NUMBERS = "Numbers";
