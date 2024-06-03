import axios from "axios";
import React, { useEffect } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from "../../utils/constants";

export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentlyPlaying = async () => {
      //   console.log("Selected Playlist id", selectedPlaylistId);

      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/player/currently-playing`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("Response: ", response);

        const { item } = response.data;
        const currentlyPlaying = {
          id: item.id,
          name: item.name.split("(")[0].trim(),
          artists: item.artists.map((artist) => artist.name),
          album: item.album.name,
          image: item.album.images[2].url,
          // url : item.external_urls.spotify,
        };
        // console.log("Curre/ntly Playing", currentlyPlaying);
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      getCurrentlyPlaying();
    }
  }, [token, dispatch]);
  return (
    <div>
      {currentlyPlaying && (
        <div className="track flex items-center gap-[1rem]">
          <div className="track_image">
            <img src={currentlyPlaying.image} alt="Currently playing" />
          </div>
          <div className="track_info flex flex-col gap-[0.3rem] ">
            <h4 className="text-white ">{currentlyPlaying.name}</h4>
            <h6 className="text-[#b3b3b3]">
              {currentlyPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}
