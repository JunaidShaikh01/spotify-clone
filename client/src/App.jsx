import React, { useEffect } from "react";
import Login from "./components/Login/Login";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/constants";
import Spotify from "./components/SpotifyLayout/Spotify";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    console.log("hash is", hash);
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({
        type: reducerCases.SET_TOKEN,
        token,
      });
    }
  }, [token, dispatch]);

  return <div>{token ? <Spotify /> : <Login />}</div>;
}
