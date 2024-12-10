import { createContext, useState, FC, Dispatch, SetStateAction } from 'react'

type CurrentHutContextType = {
   currentHut: number | null
   setCurrentHut: Dispatch<SetStateAction<number | null>>
}

type Props = {
   children: React.ReactNode
}

const CurrentHutContext = createContext<CurrentHutContextType>({
   currentHut: null,
   setCurrentHut: () => {},
})

const CurrentHutContextProvider: FC<Props> = ({ children }) => {
   const [currentHut, setCurrentHut] = useState<number | null>(null)

   return <CurrentHutContext.Provider value={{ currentHut, setCurrentHut }}>{children}</CurrentHutContext.Provider>
}

export { CurrentHutContext, CurrentHutContextProvider }
