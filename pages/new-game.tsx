import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Settings } from ".";
import { IconToken, NumberToken } from "../components/boardTokens";
import { MobileGameMenu, WinGame } from "../components/modals";
import { useAppContext } from "../context/state";
import {
  initial4x4BoardWithIcons,
  initial4x4BoardWithNumbers,
  initial6x6BoardWithIcons,
  initial6x6BoardWithNumbers,
} from "../data/boards";
import {
  Token,
  GameState,
  TokenState,
  ICONS,
  FOUR_BY_FOUR,
  SIX_BY_SIX,
} from "../data/models";
import shuffle from "../utils/shuffle";

const NewGame: NextPage = () => {
  const appContext = useAppContext();
  const [gameState, setGameState] = React.useState<GameState>(
    GameState.Started
  );
  const [gameTokens, setGameTokens] = React.useState<Token[]>(
    initial4x4BoardWithNumbers
  );
  const [revealed, setRevealed] = React.useState<Token[]>([]);
  const [gameClock, setGameClock] = React.useState<number>(0);
  const [moves, setMoves] = React.useState<number>(0);
  const router = useRouter();

  //   Modals
  let [isGameModalOpen, setGameModalOpen] = React.useState(false);
  let [isMenuModalOpen, setMenuModalOpen] = React.useState(false);

  // Shuffle Tokens
  useEffect(() => {
    setupBoard(appContext.settings);
  }, [appContext.settings]);

  //timer that counts up
  useEffect(() => {
    if (gameState === GameState.Ended || gameState === GameState.Paused) return;

    const interval = setInterval(() => {
      setGameClock((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    //Detect if the game is over
    const numberOfFlagged = gameTokens.filter(
      (token) => token.state === TokenState.Flagged
    ).length;

    if (numberOfFlagged === gameTokens.length) {
      //All tokens are flagged
      //Game is over
      setGameState(GameState.Ended);
    }
  }, [gameTokens]);

  useEffect(() => {
    if (gameState === GameState.Ended) {
      //Stop the timer
      setGameModalOpen(true);
    }
  }, [gameState, gameClock]);

  useEffect(() => {
    if (revealed.length === 2) {
      // Check if the two tokens match
      if (revealed[0].value === revealed[1].value) {
        setGameTokens((prev) =>
          prev.map((token) => {
            if (token.id === revealed[0].id || token.id === revealed[1].id) {
              return { ...token, state: TokenState.Flagged };
            }
            return { ...token };
          })
        );
      }
      // Set all revealed tokens to hidden after 2 seconds
      setTimeout(() => {
        setGameTokens((prev) =>
          prev.map((token) => {
            if (token.state === TokenState.Flagged) {
              return { ...token, state: TokenState.Flagged };
            }
            return { ...token, state: TokenState.Hidden };
          })
        );
      }, 400);
      return setRevealed([]);
    }
  }, [revealed]);

  function onTokenClick(token: Token) {
    setMoves(moves + 1);
    if (token.state === TokenState.Hidden) {
      setRevealed((prev) => [...prev, token]);
      setGameTokens((prev) =>
        prev.map((t) =>
          t.id === token.id ? { ...t, state: TokenState.Revealed } : t
        )
      );
    }
  }

  function openMenuModal() {
    //Pause the game
    setGameState(GameState.Paused);
    setMenuModalOpen(true);
  }
  function closeMenuModal() {
    setGameState(GameState.Started);
    setMenuModalOpen(false);
  }

  function setupNewGame() {
    router.push("/");
  }
  function restartGame() {
    setGameState(GameState.Started);
    setGameClock(0);
    setMoves(0);
    setupBoard(appContext.settings);
    setRevealed([]);
    setGameModalOpen(false);
    setMenuModalOpen(false);
  }

  function setupBoard(settings: Settings): void {
    if (settings.theme === ICONS) {
      if (settings.gridSize === FOUR_BY_FOUR) {
        setGameTokens(shuffle(initial4x4BoardWithIcons));
      } else {
        setGameTokens(shuffle(initial6x6BoardWithIcons));
      }
    } else {
      if (settings.gridSize === FOUR_BY_FOUR) {
        setGameTokens(shuffle(initial4x4BoardWithNumbers));
      } else {
        setGameTokens(shuffle(initial6x6BoardWithNumbers));
      }
    }
  }
  return (
    <div>
      <Head>
        <title>Memory Game - New Game</title>
        <meta
          name="description"
          content="Memory game challenge from frontend mentor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" bg-quaternary-shade min-h-screen w-full grid p-6 mx-auto md:p-10">
        <div className="container mx-auto text-center max-w-[327px] md:max-w-[654px] xl:max-w-[1110px]">
          {/* Top Menu */}
          <div className="grid grid-cols-2 place-items-center w-full">
            <h1 className="w-full text-left text-2xl font-bold md:text-4xl">
              memory
            </h1>
            <button
              className="btn-primary py-2 px-4 place-self-end md:hidden"
              onClick={openMenuModal}
            >
              Menu
            </button>
            <div className="hidden md:grid md:grid-cols-2 md:gap-4 place-self-end">
              <button
                className="btn-primary py-2 px-4 place-self-end md:text-xl "
                onClick={restartGame}
              >
                Restart
              </button>
              <button
                className="btn-tertiary py-2 px-4 place-self-end md:text-xl"
                onClick={setupNewGame}
              >
                New Game
              </button>
            </div>
          </div>
          {/* Game board */}

          {appContext.settings.gridSize === FOUR_BY_FOUR && (
            <div className="grid grid-cols-4 gap-3 mt-20 md:max-w-[540px] mx-auto">
              {gameTokens.map((token) =>
                token.isIcon ? (
                  <IconToken
                    key={token.id}
                    token={token}
                    onClick={onTokenClick}
                    gameState={gameState}
                    boardSize={FOUR_BY_FOUR}
                  />
                ) : (
                  <NumberToken
                    key={token.id}
                    token={token}
                    onClick={onTokenClick}
                    gameState={gameState}
                    boardSize={FOUR_BY_FOUR}
                  />
                )
              )}
            </div>
          )}
          {appContext.settings.gridSize === SIX_BY_SIX && (
            // TODO: fix this for mobile
            <div className="grid grid-cols-6 gap-2 mt-20 md:max-w-[572px] mx-auto">
              {gameTokens.map((token) =>
                token.isIcon ? (
                  <IconToken
                    key={token.id}
                    token={token}
                    onClick={onTokenClick}
                    gameState={gameState}
                    boardSize={SIX_BY_SIX}
                  />
                ) : (
                  <NumberToken
                    key={token.id}
                    token={token}
                    onClick={onTokenClick}
                    gameState={gameState}
                    boardSize={SIX_BY_SIX}
                  />
                )
              )}
            </div>
          )}
        </div>
        {/* Statistics section */}
        <div className="grid grid-cols-2 mt-24 gap-8 max-h-[70px] mx-auto w-full md:max-w-[540px]">
          <div className="bg-quinary-shade rounded-md grid py-2 px-8 md:grid-cols-2 md:place-content-center">
            <span className="text-center text-secondary-shade font-bold md:place-self-center md:text-left md:w-full md:text-lg">
              Time
            </span>
            <span className="block text-center flex-1 text-tertiary font-bold text-2xl md:place-self-center md:text-right md:w-full md:text-3xl">
              {new Date(gameClock * 1000).toISOString().substr(14, 5)}
            </span>
          </div>
          <div className="bg-quinary-shade rounded-md px-8 py-2 grid md:grid-cols-2 md:place-content-center">
            <span className="text-center text-secondary-shade font-bold md:place-self-center md:text-left md:w-full md:text-lg">
              Moves
            </span>
            <span className="block text-center text-tertiary font-bold text-2xl md:place-self-center md:text-right md:w-full md:text-3xl">
              {moves}
            </span>
          </div>
        </div>
      </main>
      {/* Game winning Modal */}
      <WinGame
        gameClock={gameClock}
        moves={moves}
        onClose={() => {}}
        isGameModalOpen={isGameModalOpen}
        restartGame={restartGame}
        setupNewGame={setupNewGame}
      />
      {/* Menu Modal */}
      <MobileGameMenu
        isMenuModalOpen={isMenuModalOpen}
        onClose={closeMenuModal}
        restartGame={restartGame}
        setupNewGame={setupNewGame}
      />
    </div>
  );
};
export default NewGame;
