import { useEffect, useReducer } from "react";

const initialState = JSON.parse(localStorage.getItem("favourites")) || [];

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE":
      const exists = state.some((img) => img.id === action.payload.id);
      return exists
        ? state.filter((img) => img.id !== action.payload.id)
        : [...state, action.payload];

    default:
      return state;
  }
}

export function useFavourites() {
  const [favourites, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (image) => {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: image,
    });
  };

  return { favourites, toggleFavourite };
}
