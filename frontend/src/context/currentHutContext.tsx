import { createContext, useState, FC, Dispatch, SetStateAction } from "react";

type CurrentHutContextType = {
  currentHut: number | null;
  setCurrentHut: Dispatch<SetStateAction<number | null>>;
};

type Props = {
  children: React.ReactNode;
};

export const CurrentHutContext = createContext<CurrentHutContextType>({
  currentHut: null,
  setCurrentHut: () => {},
});

export const CurrentHutContextProvider: FC<Props> = ({ children }) => {
  const [currentHut, setCurrentHut] = useState<number | null>(null);

  return <CurrentHutContext.Provider value={{ currentHut, setCurrentHut }}>{children}</CurrentHutContext.Provider>;
};
