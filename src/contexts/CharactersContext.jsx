import { createContext, useReducer } from "react";
import {
  charactersInitialState,
  charactersReducer
} from "../reducers/charactersReducer";

export const CharactersContext = createContext(null);
export const CharactersDispatchContext = createContext(null);

export const CharactersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    charactersReducer,
    charactersInitialState
  );

  return (
    <CharactersContext.Provider value={state}>
      <CharactersDispatchContext.Provider value={dispatch}>
        {children}
      </CharactersDispatchContext.Provider>
    </CharactersContext.Provider>
  );
};
