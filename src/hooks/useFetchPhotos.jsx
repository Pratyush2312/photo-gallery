import { useEffect, useReducer } from "react";
const IMG_URL = import.meta.env.VITE_IMAGE_URL;
const initialState = {
  images: [],
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        images: action.payload,
        loading: false,
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}

const useFetchPhotos = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const res = await fetch(IMG_URL);

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "FETCH_ERROR",
          payload: error.message,
        });
      }
    };

    getPhotos();
  }, []);

  return { state };
};

export { useFetchPhotos };
