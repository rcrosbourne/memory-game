import { Transition, Dialog } from "@headlessui/react";
import { NextPage } from "next";
import Head from "next/head";
import React, { Fragment, useEffect } from "react";
import { Settings } from ".";

enum TokenState {
  Hidden,
  Revealed,
  Flagged,
}
enum GameState {
  Started,
  Ended,
  Paused,
  PauseSelecting,
}
interface Token {
  state: TokenState;
  value: number;
  id: number;
}
const initialBoard: Token[] = [
  { state: TokenState.Hidden, value: 1, id: 1 },
  { state: TokenState.Hidden, value: 2, id: 2 },
  { state: TokenState.Hidden, value: 3, id: 3 },
  { state: TokenState.Hidden, value: 4, id: 4 },
  { state: TokenState.Hidden, value: 5, id: 5 },
  { state: TokenState.Hidden, value: 6, id: 6 },
  { state: TokenState.Hidden, value: 7, id: 7 },
  { state: TokenState.Hidden, value: 8, id: 8 },
  { state: TokenState.Hidden, value: 1, id: 9 },
  { state: TokenState.Hidden, value: 2, id: 10 },
  { state: TokenState.Hidden, value: 3, id: 11 },
  { state: TokenState.Hidden, value: 4, id: 12 },
  { state: TokenState.Hidden, value: 5, id: 13 },
  { state: TokenState.Hidden, value: 6, id: 14 },
  { state: TokenState.Hidden, value: 7, id: 15 },
  { state: TokenState.Hidden, value: 8, id: 16 },
];

const NewGame: NextPage = () => {
  //   const settings = JSON.parse(
  //     localStorage.getItem("gameSettings") || "{}"
  //   ) as Settings;
  const [gameState, setGameState] = React.useState<GameState>(
    GameState.Started
  );
  const [gameTokens, setGameTokens] = React.useState<Token[]>(initialBoard);
  const [revealed, setRevealed] = React.useState<Token[]>([]);
  const [gameClock, setGameClock] = React.useState<number>(0);
  const [moves, setMoves] = React.useState<number>(0);

  //timer that counts up
  useEffect(() => {
    if (gameState === GameState.Ended) return;

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
      //clearInterval(gameClock);
      setIsOpen(true);
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
  let [isOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
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
            <button className="btn-primary py-2 px-4 place-self-end">
              Menu
            </button>
          </div>
          {/* Game board */}
          <div className="grid grid-cols-4 gap-3 mt-20">
            {gameTokens.map((token) => (
              <button
                className={`${
                  token.state === TokenState.Revealed
                    ? "bg-primary"
                    : token.state === TokenState.Hidden
                    ? "bg-teritiary"
                    : "bg-secondary"
                } h-16 w-16 rounded-full text-quaternary-shade font-bold`}
                key={token.id}
                onClick={() => {
                  onTokenClick(token);
                }}
                disabled={
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
            ))}
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
      {/* Dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-shade shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-quaternary"
                >
                  You did it!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-secondary-shade">
                    Game over! Here’s how you got on…
                  </p>
                </div>

                <div className="mt-2">
                  <p>Time Elapsed</p>
                  <p>
                    {new Date(gameClock * 1000).toISOString().substr(14, 5)}
                  </p>
                </div>

                <div className="mt-2">
                  <p>Moves Taken</p>
                  <p>{moves} Moves</p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={closeModal}
                  >
                    Restart
                  </button>
                  <button
                    type="button"
                    className="btn-secondary text-black"
                    onClick={closeModal}
                  >
                    Setup New Game
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
export default NewGame;
