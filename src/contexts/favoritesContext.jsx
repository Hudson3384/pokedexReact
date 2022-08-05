import react, { createContext } from "react";
const favoritesContext = createContext({
  favoritePokemons: [],
  updateFavoritePokemons: (id) => null,
});

export const FavoriteProvider = favoritesContext.Provider;
export default favoritesContext;
