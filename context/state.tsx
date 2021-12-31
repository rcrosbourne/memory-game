import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Settings } from "../pages";

type Props = {
  children: ReactNode;
};
type AppContextType = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};
//Initial context value
const initialContextValue: AppContextType = {
  settings: {
    theme: "Numbers",
    numberOfPlayers: "1",
    gridSize: "4x4",
  },
  setSettings: (settings: Settings) => {},
};

const AppContext = createContext<AppContextType>(initialContextValue);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }: Props): JSX.Element {
  const [appState, setAppState] = useState<AppContextType>(initialContextValue);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("gameSettings") || "{}")) {
      const localStorageSettings = JSON.parse(
        localStorage.getItem("gameSettings") || "{}"
      ) as Settings;
      setAppState({ ...appState, settings: localStorageSettings });
    }
  }, []);
  useEffect(() => {
    if (appState.settings !== initialContextValue.settings) {
      localStorage.setItem("gameSettings", JSON.stringify(appState.settings));
    }
  }, [appState.settings]);

  const contextValue: AppContextType = {
    settings: appState.settings,
    setSettings: (settings: Settings) => {
      setAppState({ ...appState, settings });
    },
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
