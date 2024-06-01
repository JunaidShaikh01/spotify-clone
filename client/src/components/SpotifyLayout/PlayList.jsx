import React from "react";
import { useEffect } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../../utils/constants";
export default function PlayList() {
  const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        const { items } = response.data;

        const playlists = items.map(({ name, id }) => {
          return { name, id };
        });

        dispatch({ type: reducerCases.SET_PYALISTS, playlists });
      } catch (error) {
        console.log("Error fetching playlist: " + error);
      }
    };
    if (token) {
      getPlaylistData();
    }
  }, [token, dispatch]);
  return (
    <div className="h-[100%] overflow-hidden">
      <ul className="list-none flex flex-col gap-[1rem] p-[1rem] h-[55vh] max-h-[100%]  overflow-auto scrollbar-thin scrollbar-thumb-gray-400">
        {playlists.map(({ name, id }) => {
          return (
            <li
              className="flex gap-[1rem] cursor-pointer transition duration-300 ease-in-out hover:text-white items-center"
              key={id}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
