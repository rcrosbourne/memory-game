import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Settings } from ".";

const NewGame: NextPage = () => {
  //   const settings = JSON.parse(
  //     localStorage.getItem("gameSettings") || "{}"
  //   ) as Settings;

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
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
            <button className="btn-primary h-16 w-16 text-4xl font-bold">
              4
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-24 gap-8 max-h-[70px]">
          <div className="bg-quinary-shade rounded-md grid py-2 px-8">
            <span className="text-center text-secondary-shade font-bold">
              Time
            </span>
            <span className="block text-center flex-1 text-teritiary font-bold text-2xl">
              1:53
            </span>
          </div>
          <div className="bg-quinary-shade rounded-md px-8 py-2 grid">
            <span className="text-center text-secondary-shade font-bold">
              Moves
            </span>
            <span className="block text-center text-teritiary font-bold text-2xl">
              39
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
export default NewGame;
