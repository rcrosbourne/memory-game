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

      <main className="container">
        <h2>Build something great</h2>
        <div className="text-black">
          <h2>Icon test</h2>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
