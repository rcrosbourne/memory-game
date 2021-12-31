import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IconToken, NumberToken } from "../components/boardTokens";
import { MobileGameMenu, WinGame } from "../components/modals";
import { useAppContext } from "../context/state";
import {
  initial4x4BoardWithIcons,
  initial4x4BoardWithNumbers,
} from "../data/boards";
import { Token, GameState, TokenState, ICONS } from "../data/models";
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
    if (appContext.settings.theme === ICONS) {
      setGameTokens(shuffle(initial4x4BoardWithIcons));
    } else {
      setGameTokens(shuffle(initial4x4BoardWithNumbers));
    }
  }, [appContext.settings.theme]);

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
    if (appContext.settings.theme === "Icons") {
      setGameTokens(shuffle(initial4x4BoardWithIcons));
    } else {
      setGameTokens(shuffle(initial4x4BoardWithNumbers));
    }
    setRevealed([]);
    setGameModalOpen(false);
    setMenuModalOpen(false);
  }
  return (
    <div className="">
      <Head>
        <title>Memory Game - New Game</title>
        <meta
          name="description"
          content="Memory game challenge from frontend mentor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" bg-quaternary-shade min-h-screen w-full grid p-6 mx-auto">
        <div className="container mx-auto text-center max-w-[327px] md:max-w-[654px]">
          {/* Top Menu */}
          <div className="grid grid-cols-2 place-items-center">
            <h2 className="w-full text-left text-2xl font-bold">memory</h2>
            <button
              className="btn-primary py-2 px-4 place-self-end"
              onClick={openMenuModal}
            >
              Menu
            </button>
          </div>
          {/* Game board */}
          <div className="grid grid-cols-4 gap-3 mt-20">
            {gameTokens.map((token) =>
              token.isIcon ? (
                <IconToken
                  key={token.id}
                  token={token}
                  onClick={onTokenClick}
                  gameState={gameState}
                />
              ) : (
                <NumberToken
                  key={token.id}
                  token={token}
                  onClick={onTokenClick}
                  gameState={gameState}
                />
              )
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 mt-24 gap-8 max-h-[70px]">
          <div className="bg-quinary-shade rounded-md grid py-2 px-8">
            <span className="text-center text-secondary-shade font-bold">
              Time
            </span>
            <span className="block text-center flex-1 text-teritiary font-bold text-2xl">
              {new Date(gameClock * 1000).toISOString().substr(14, 5)}
            </span>
          </div>
          <div className="bg-quinary-shade rounded-md px-8 py-2 grid">
            <span className="text-center text-secondary-shade font-bold">
              Moves
            </span>
            <span className="block text-center text-teritiary font-bold text-2xl">
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
