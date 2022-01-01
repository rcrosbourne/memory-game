import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FOUR_BY_FOUR, GameState, Token, TokenState } from "../data/models";

export function IconToken({
  token,
  gameState,
  onClick,
  boardSize,
}: {
  token: Token;
  gameState: GameState;
  boardSize: string;
  onClick: (token: Token) => void;
}) {
  return (
    <button
      key={token.id}
      className={`${
        token.state === TokenState.Revealed
          ? "bg-primary"
          : token.state === TokenState.Hidden
          ? "bg-tertiary"
          : "bg-secondary"
      } ${
        boardSize === FOUR_BY_FOUR
          ? "h-16 w-16 md:h-28 md:w-28"
          : "h-12 w-12 md:h-20 md:w-20"
      } rounded-full text-quaternary-shade font-bold grid grid-cols-1`}
      onClick={() => onClick(token)}
      disabled={
        token.state === TokenState.Revealed ||
        token.state === TokenState.Flagged ||
        gameState === GameState.PauseSelecting
      }
    >
      <FontAwesomeIcon
        icon={token.value as IconName}
        className={`${token.state === TokenState.Hidden ? "hidden" : "block"} ${
          boardSize === FOUR_BY_FOUR
            ? "h-8 w-8 md:h-20 md:w-20"
            : "h-7 w-7 md:h-14 md:w-14"
        } place-self-center`}
      />
    </button>
  );
}
export function NumberToken({
  token,
  gameState,
  boardSize,
  onClick,
}: {
  token: Token;
  gameState: GameState;
  boardSize: string;
  onClick: (token: Token) => void;
}) {
  return (
    <button
      className={`${
        token.state === TokenState.Revealed
          ? "bg-primary"
          : token.state === TokenState.Hidden
          ? "bg-tertiary"
          : "bg-secondary"
      } ${
        boardSize === FOUR_BY_FOUR
          ? "h-16 w-16 md:h-28 md:w-28"
          : "h-12 w-12 md:h-20 md:w-20"
      } rounded-full text-quaternary-shade font-bold`}
      key={token.id}
      onClick={() => onClick(token)}
      disabled={
        token.state === TokenState.Revealed ||
        token.state === TokenState.Flagged ||
        gameState === GameState.PauseSelecting
      }
    >
      <span
        className={`${token.state === TokenState.Hidden ? "hidden" : "block"} ${
          boardSize === FOUR_BY_FOUR
            ? "text-4xl md:text-6xl"
            : "text-2xl md:text-5xl"
        } font-bold`}
      >
        {token.value}
      </span>
    </button>
  );
}
