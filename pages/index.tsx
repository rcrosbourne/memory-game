import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
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
          <div className="bg-primary-shade rounded-[10px] mt-[45px] p-6 grid">
            <div className="flex flex-col">
              <span className="text-left text-secondary-shade font-bold text-[15px] leading[19px]">
                Select Theme
              </span>
              <div className="flex items-center justify-between gap-[11px] w-full mt-[11px]">
                <button className="min-w-[134px] py-[10px] px-[33px] btn-secondary btn-active">
                  Numbers
                </button>
                <button className="min-w-[134px] py-[10px] px-[33px] btn-secondary btn-idle">
                  Icons
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col">
              <span className="text-left text-secondary-shade font-bold text-[15px] leading[19px]">
                Number of Players
              </span>
              <div className="flex items-center justify-between gap-[10px] w-full mt-[11px]">
                <button className="btn-secondary btn-active px-[27px] py-[10px]">
                  1
                </button>
                <button className="btn-secondary btn-idle px-[27px] py-[10px]">
                  2
                </button>
                <button className="btn-secondary btn-idle px-[27px] py-[10px]">
                  3
                </button>
                <button className="btn-secondary btn-idle px-[27px] py-[10px]">
                  4
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col">
              <span className="text-left text-secondary-shade font-bold text-[15px] leading[19px]">
                Grid Size
              </span>
              <div className="flex items-center justify-between gap-[11px]">
                <button className="btn-secondary btn-active px-[53px] py-[10px]">
                  4x4
                </button>
                <button className="btn-secondary btn-idle px-[53px] py-[10px]">
                  6x6
                </button>
              </div>
            </div>

            <div className="mt-8 flex w-full">
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
