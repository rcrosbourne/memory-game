import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";

export function WinGame({
  isGameModalOpen,
  gameClock,
  moves,
  restartGame,
  setupNewGame,
  onClose,
}: {
  isGameModalOpen: boolean;
  gameClock: number;
  moves: number;
  restartGame: () => void;
  setupNewGame: () => void;
  onClose: () => void;
}) {
  return (
    <Transition appear show={isGameModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        // We will not close the modal when the user clicks outside
        onClose={onClose}
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
  );
}

export function MobileGameMenu({
  isMenuModalOpen,
  restartGame,
  setupNewGame,
  onClose,
}: {
  isMenuModalOpen: boolean;
  restartGame: () => void;
  setupNewGame: () => void;
  onClose: () => void;
}) {
  return (
    <Transition appear show={isMenuModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
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
                  onClick={onClose}
                >
                  Resume Game
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
