import { IconName, IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition, Dialog } from "@headlessui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { Settings } from ".";

// Based on Fisher-Yates shuffle
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(inputArray: Token[]): Token[] {
  let currentIndex = inputArray.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [inputArray[currentIndex], inputArray[randomIndex]] = [
      inputArray[randomIndex],
      inputArray[currentIndex],
    ];
  }

  return inputArray;
}

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
  value: string;
  isIcon?: boolean;
  id: number;
}
const initialBoard: Token[] = [
  { state: TokenState.Hidden, value: "1", isIcon: false, id: 1 },
  { state: TokenState.Hidden, value: "2", isIcon: false, id: 2 },
  { state: TokenState.Hidden, value: "3", isIcon: false, id: 3 },
  { state: TokenState.Hidden, value: "4", isIcon: false, id: 4 },
  { state: TokenState.Hidden, value: "5", isIcon: false, id: 5 },
  { state: TokenState.Hidden, value: "6", isIcon: false, id: 6 },
  { state: TokenState.Hidden, value: "7", isIcon: false, id: 7 },
  { state: TokenState.Hidden, value: "8", isIcon: false, id: 8 },
  { state: TokenState.Hidden, value: "1", isIcon: false, id: 9 },
  { state: TokenState.Hidden, value: "2", isIcon: false, id: 10 },
  { state: TokenState.Hidden, value: "3", isIcon: false, id: 11 },
  { state: TokenState.Hidden, value: "4", isIcon: false, id: 12 },
  { state: TokenState.Hidden, value: "5", isIcon: false, id: 13 },
  { state: TokenState.Hidden, value: "6", isIcon: false, id: 14 },
  { state: TokenState.Hidden, value: "7", isIcon: false, id: 15 },
  { state: TokenState.Hidden, value: "8", isIcon: false, id: 16 },
];

const initialBoardWithIcons: Token[] = [
  { state: TokenState.Hidden, value: "bug", isIcon: true, id: 1 },
  { state: TokenState.Hidden, value: "futbol", isIcon: true, id: 2 },
  { state: TokenState.Hidden, value: "sun", isIcon: true, id: 3 },
  { state: TokenState.Hidden, value: "moon", isIcon: true, id: 4 },
  { state: TokenState.Hidden, value: "car", isIcon: true, id: 5 },
  { state: TokenState.Hidden, value: "flask", isIcon: true, id: 6 },
  { state: TokenState.Hidden, value: "snowflake", isIcon: true, id: 7 },
  { state: TokenState.Hidden, value: "lira-sign", isIcon: true, id: 8 },
  { state: TokenState.Hidden, value: "bug", isIcon: true, id: 9 },
  { state: TokenState.Hidden, value: "futbol", isIcon: true, id: 10 },
  { state: TokenState.Hidden, value: "sun", isIcon: true, id: 11 },
  { state: TokenState.Hidden, value: "flask", isIcon: true, id: 12 },
  { state: TokenState.Hidden, value: "snowflake", isIcon: true, id: 13 },
  { state: TokenState.Hidden, value: "lira-sign", isIcon: true, id: 14 },
  { state: TokenState.Hidden, value: "car", isIcon: true, id: 15 },
  { state: TokenState.Hidden, value: "moon", isIcon: true, id: 16 },
];

const NewGame: NextPage = () => {
  const [settings, setSettings] = React.useState<Settings>({} as Settings);
  const [gameState, setGameState] = React.useState<GameState>(
    GameState.Started
  );
  const [gameTokens, setGameTokens] = React.useState<Token[]>(initialBoard);
  const [revealed, setRevealed] = React.useState<Token[]>([]);
  const [gameClock, setGameClock] = React.useState<number>(0);
  const [moves, setMoves] = React.useState<number>(0);
  const router = useRouter();

  //   Modals
  let [isGameModalOpen, setGameModalOpen] = React.useState(false);
  let [isMenuModalOpen, setMenuModalOpen] = React.useState(false);

  // Shuffle Tokens
  useEffect(() => {
    //     setGameTokens(shuffle(initialBoard));
    setGameTokens(shuffle(initialBoardWithIcons));
  }, []);
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
      //clearInterval(gameClock);
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

  function closeModal() {
    //     setGameModalOpen(false);
  }

  function openModal() {
    setGameModalOpen(true);
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
    setGameTokens(shuffle(initialBoard));
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
                <button
                  key={token.id}
                  className={`${
                    token.state === TokenState.Revealed
                      ? "bg-primary"
                      : token.state === TokenState.Hidden
                      ? "bg-teritiary"
                      : "bg-secondary"
                  } h-16 w-16 rounded-full text-quaternary-shade font-bold grid grid-cols-1`}
                  onClick={() => {
                    onTokenClick(token);
                  }}
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
              ) : (
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
      <Transition appear show={isGameModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          // We will not close the modal when the user clicks outside
          onClose={() => {}}
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
                  className="text-2xl font-bold leading-8 text-center text-quaternary"
                >
                  You did it!
                </Dialog.Title>
                <div className="mt-2 w-full text-center">
                  <p className="text-sm text-secondary-shade">
                    Game over! Here’s how you got on…
                  </p>
                </div>

                <div className="mt-6 bg-quinary-shade py-3 px-4 rounded-md grid grid-cols-2">
                  <p className="text-secondary-shade font-bold text-sm">
                    Time Elapsed
                  </p>
                  <p className="place-self-end font-bold text-teritiary text-xl">
                    {new Date(gameClock * 1000).toISOString().substr(14, 5)}
                  </p>
                </div>

                <div className="mt-2 bg-quinary-shade py-3 px-4 rounded-md grid grid-cols-2">
                  <p className="text-secondary-shade font-bold text-sm">
                    Moves Taken
                  </p>
                  <p className="place-self-end font-bold text-teritiary text-xl">
                    {moves} Moves
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    className="btn-primary w-full py-3 font-bold text-lg"
                    onClick={restartGame}
                  >
                    Restart
                  </button>
                  <button
                    type="button"
                    className="btn-secondary w-full mt-4 text-teritiary font-bold text-lg bg-quinary-shade py-3"
                    onClick={setupNewGame}
                  >
                    New Game
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* Menu Modal */}
      <Transition appear show={isMenuModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeMenuModal}
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
                <div className="">
                  <button
                    type="button"
                    className="btn-primary w-full py-3 font-bold text-lg"
                    onClick={restartGame}
                  >
                    Restart
                  </button>
                  <button
                    type="button"
                    className="btn-secondary w-full mt-4 text-teritiary font-bold text-lg bg-quinary-shade py-3"
                    onClick={setupNewGame}
                  >
                    New Game
                  </button>
                  <button
                    type="button"
                    className="btn-secondary w-full mt-4 text-teritiary font-bold text-lg bg-quinary-shade py-3"
                    onClick={closeMenuModal}
                  >
                    Resume Game
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
