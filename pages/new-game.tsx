import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Settings } from ".";

const NewGame: NextPage = () => {
  const settings = JSON.parse(
    localStorage.getItem("gameSettings") || "{}"
  ) as Settings;

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
          <div className="grid grid-cols-2 place-items-center">
            <h2 className="w-full text-left text-2xl font-bold">memory</h2>
            <button className="btn-primary py-2 px-4 place-self-end">
              Menu
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default NewGame;
