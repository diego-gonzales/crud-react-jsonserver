import { ACTION_TYPES } from "../actions/charactersActions";

export function charactersReducer(characters, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL:
      return [...action.data];

    case ACTION_TYPES.ADD:
      return [...characters, action.character];

    case ACTION_TYPES.UPDATE:
      return characters.map((character) =>
        character.id === action.id ? action.character : character
      );

    case ACTION_TYPES.DELETE:
      const charactersFiltered = characters.filter(
        (character) => character.id !== action.id
      );
      return charactersFiltered;

    default:
      throw Error("Unknown action: " + action.type);
  }
}

export const charactersInitialState = [];
