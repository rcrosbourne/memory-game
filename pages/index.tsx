import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RadioGroup } from "@headlessui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";

const menuOptions = {
  themes: ["Numbers", "Icons"],
  numberOfPlayers: ["1", "2", "3", "4"],
  gridSizes: ["4x4", "6x6"],
};
interface menuSelection {
  theme: string;
  numberOfPlayers: string;
  gridSize: string;
}
const Home: NextPage = () => {
  const [menuSelection, setMenuSelection] = React.useState<menuSelection>({
    theme: "Numbers",
    numberOfPlayers: "1",
    gridSize: "4x4",
  });
  return (
    <div className="">
      <Head>
        <title>Memory Game</title>
        <meta
          name="description"
          content="Memory game challenge from frontend mentor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" bg-quaternary min-h-screen w-full grid px-6 mx-auto">
        <div className="container mx-auto text-center max-w-[327px] md:max-w-[654px]">
          <h2 className="text-primary-shade font-atkinson-hyperlegible text-2xl mt-20 font-bold md:mt-40">
            memory
          </h2>
          <div className="bg-primary-shade rounded-xl mt-10 p-6 grid gap-y-8 md:mt-20 md:p-14 md:max-w-[654px]">
            {/* Theme Selection Radio Group */}
            <RadioGroup
              value={menuSelection.theme}
              onChange={(e) =>
                setMenuSelection((prev) => ({ ...prev, theme: e }))
              }
            >
              <RadioGroup.Label>
                <span className="block text-left text-secondary-shade font-bold leading[19px] md:text-xl">
                  Select Theme
                </span>
              </RadioGroup.Label>

              <div className="grid grid-cols-2 gap-3 w-full mt-3 md:gap-8">
                {menuOptions.themes.map((theme) => (
                  <RadioGroup.Option
                    value={theme}
                    key={theme}
                    as={React.Fragment}
                  >
                    {({ checked, active }) => (
                      <button
                        className={`${
                          checked || active ? "btn-active" : "btn-idle"
                        } min-w-[134px] py-3 px-8 btn-secondary leading-5 md:text-2xl`}
                      >
                        {theme}
                      </button>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            {/* Number of players Radio Group */}
            <RadioGroup
              value={menuSelection.numberOfPlayers}
              onChange={(e) =>
                setMenuSelection((prev) => ({ ...prev, numberOfPlayers: e }))
              }
            >
              <RadioGroup.Label>
                <span className="block text-left text-secondary-shade font-bold leading[19px] md:text-xl">
                  Number of Players
                </span>
              </RadioGroup.Label>

              <div className="grid grid-cols-4 gap-3 w-full mt-3 md:gap-5">
                {menuOptions.numberOfPlayers.map((player) => (
                  <RadioGroup.Option
                    value={player}
                    key={`player-${player}`}
                    as={React.Fragment}
                  >
                    {({ checked, active }) => (
                      <button
                        className={`${
                          checked || active ? "btn-active" : "btn-idle"
                        } btn-secondary py-3 md:text-2xl`}
                      >
                        {player}
                      </button>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            {/* Grid Size Radio Group */}
            <RadioGroup
              value={menuSelection.gridSize}
              onChange={(e) =>
                setMenuSelection((prev) => ({ ...prev, gridSize: e }))
              }
            >
              <RadioGroup.Label>
                <span className="block text-left text-secondary-shade font-bold md:text-xl">
                  Grid Size
                </span>
              </RadioGroup.Label>

              <div className="grid grid-cols-2 gap-3 w-full mt-3">
                {menuOptions.gridSizes.map((gridSize) => (
                  <RadioGroup.Option
                    value={gridSize}
                    key={`grid-${gridSize}`}
                    as={React.Fragment}
                  >
                    {({ checked, active }) => (
                      <button
                        className={`${
                          checked || active ? "btn-active" : "btn-idle"
                        } btn-secondary py-3 md:text-2xl`}
                      >
                        {gridSize}
                      </button>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            {/* Submit */}
            <div className="w-full">
              <button className="btn-primary w-full py-3 md:text-3xl md:py-4 text-xl">
                Start Game
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
