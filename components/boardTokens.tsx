import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GameState, Token, TokenState } from "../data/models";

export function IconToken({
  token,
  gameState,
  onClick,
}: {
  token: Token;
  gameState: GameState;
  onClick: (token: Token) => void;
}) {
  return (
    <button
      key={token.id}
      className={`${
        token.state === TokenState.Revealed
          ? "bg-primary"
          : token.state === TokenState.Hidden
          ? "bg-teritiary"
          : "bg-secondary"
      } h-16 w-16 rounded-full text-quaternary-shade font-bold grid grid-cols-1`}
      onClick={() => onClick(token)}
      disabled={
        token.state === TokenState.Revealed ||
        token.state === TokenState.Flagged ||
        gameState === GameState.PauseSelecting
      }
    >
      <FontAwesomeIcon
        icon={token.value as IconName}
        className={`${
          token.state === TokenState.Hidden ? "hidden" : "block"
        } h-8 w-8 place-self-center`}
      />
    </button>
  );
}
export function NumberToken({
  token,
  gameState,
  onClick,
}: {
  token: Token;
  gameState: GameState;
  onClick: (token: Token) => void;
}) {
  return (
    <button
      className={`${
        token.state === TokenState.Revealed
          ? "bg-primary"
          : token.state === TokenState.Hidden
          ? "bg-teritiary"
          : "bg-secondary"
      } h-16 w-16 rounded-full text-quaternary-shade font-bold`}
      key={token.id}
      onClick={() => onClick(token)}
      disabled={
        token.state === TokenState.Revealed ||
        token.state === TokenState.Flagged ||
        gameState === GameState.PauseSelecting
      }
    >
      <span
        className={`${
          token.state === TokenState.Hidden ? "hidden" : "block"
        } text-4xl font-bold`}
      >
        {token.value}
      </span>
    </button>
  );
}
