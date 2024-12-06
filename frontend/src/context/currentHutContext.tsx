import { createContext, useState, FC, Dispatch, SetStateAction } from "react";

type CurrentHutsContextType = {
  currentHuts: number | null;
  setCurrentHuts: Dispatch<SetStateAction<number | null>>;
};

type Props = {
  children: React.ReactNode;
};

export const CurrentHutsContext = createContext<CurrentHutsContextType>({
  currentHuts: null,
  setCurrentHuts: () => {},
});

export const CurrentHutsContextProvider: FC<Props> = ({ children }) => {
  const [currentHuts, setCurrentHuts] = useState<number | null>(null);

  return <CurrentHutsContext.Provider value={{ currentHuts, setCurrentHuts }}>{children}</CurrentHutsContext.Provider>;
};
