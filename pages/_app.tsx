import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFutbol,
  faBug,
  faAnchor,
  faFlask,
  faSun,
  faHandSpock,
  faMoon,
  faSnowflake,
  faLiraSign,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import { AppContextProvider } from "../context/state";

library.add(
  faFutbol,
  faBug,
  faAnchor,
  faFlask,
  faSun,
  faHandSpock,
  faMoon,
  faSnowflake,
  faLiraSign,
  faCar
);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
