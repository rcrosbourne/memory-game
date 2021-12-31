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
export const FOUR_BY_FOUR = "4x4";
export const SIX_BY_SIX = "6x6";
