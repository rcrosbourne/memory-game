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
        <div className="container mx-auto text-center max-w-[327px]">
          <h2 className="text-primary-shade font-atkinson-hyperlegible text-2xl mt-20 font-bold leading-[39.68px]">
            memory
          </h2>
          <div className="bg-primary-shade rounded-[10px] mt-[45px] p-6 grid gap-y-8">
            {/* Theme Selection Radio Group */}
            <RadioGroup
              value={menuSelection.theme}
              onChange={(e) =>
                setMenuSelection((prev) => ({ ...prev, theme: e }))
              }
            >
              <RadioGroup.Label>
                <span className="block text-left text-secondary-shade font-bold text-[15px] leading[19px]">
                  Select Theme
                </span>
              </RadioGroup.Label>

              <div className="flex items-center justify-between gap-[11px] w-full mt-[11px]">
                {menuOptions.themes.map((theme) => (
                  <RadioGroup.Option value={theme} key={theme}>
                    {({ checked, active }) => (
                      <button
                        className={`${
                          checked || active ? "btn-active" : "btn-idle"
                        } min-w-[134px] py-[10px] px-[33px] btn-secondary`}
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
                <span className="block text-left text-secondary-shade font-bold text-[15px] leading[19px]">
                  Number of Players
                </span>
              </RadioGroup.Label>

              <div className="grid grid-cols-4 gap-[10px] w-full mt-[11px]">
                {menuOptions.numberOfPlayers.map((player) => (
                  <RadioGroup.Option
                    value={player}
                    key={`player-${player}`}
                    className="focus:outline-none"
                  >
                    {({ checked, active }) => (
                      <button
                        className={`${
                          checked || active ? "btn-active" : "btn-idle"
                        } btn-secondary px-[27px] py-[10px]`}
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
                <span className="block text-left text-secondary-shade font-bold text-[15px] leading[19px]">
                  Grid Size
                </span>
              </RadioGroup.Label>

              <div className="grid grid-cols-2 gap-[10px] w-full mt-[11px]">
                {menuOptions.gridSizes.map((gridSize) => (
                  <RadioGroup.Option value={gridSize} key={`grid-${gridSize}`}>
                    {({ checked, active }) => (
                      <button
                        className={`${
                          checked || active ? "btn-active" : "btn-idle"
                        } btn-secondary px-[53px] py-[10px]`}
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
              <button className="btn-primary w-full py-3">Start Game</button>
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
