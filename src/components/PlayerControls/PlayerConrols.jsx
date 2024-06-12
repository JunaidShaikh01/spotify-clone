import React from "react";
import { useStateProvider } from "../../utils/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faCirclePause,
  faCirclePlay,
  faForwardStep,
  faRepeat,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { reducerCases } from "../../utils/constants";

export default function PlayerConrols() {
  const [{ token, playerState }, dispatch] = useStateProvider();

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };
  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });

    const response = await axios.get(
      `https://api.spotify.com/v1/me/player/currently-playing`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const { item } = response.data;
    if (response.data !== "") {
      const currentlyPlaying = {
        id: item.id,
        name: item.name.split("(")[0].trim(),
        artists: item.artists.map((artist) => artist.name),
        album: item.album.name,
        image: item.album.images[2].url,
      };

      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
    } else {
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
    }
  };

  return (
    <div className="flex items-center justify-center gap-[2rem]">
      <div className="shuffle">
        <FontAwesomeIcon
          className="text-[#b3b3b3] transition  duration-300 ease-in-out hover:text-white"
          icon={faShuffle}
        />
      </div>
      <div className="previous text-[1.5rem]">
        <FontAwesomeIcon
          className="text-[#b3b3b3] transition  duration-300 ease-in-out hover:text-white "
          icon={faBackwardStep}
          onClick={() => changeTrack("previous")}
        />
      </div>
      <div className="state text-[2rem]">
        {playerState ? (
          <FontAwesomeIcon
            className="text-white"
            icon={faCirclePause}
            onClick={changeState}
          />
        ) : (
          <FontAwesomeIcon
            className="text-white"
            icon={faCirclePlay}
            onClick={changeState}
          />
        )}
      </div>
      <div className="next text-[1.5rem]">
        <FontAwesomeIcon
          className="text-[#b3b3b3] transition  duration-300 ease-in-out hover:text-white"
          icon={faForwardStep}
          onClick={() => changeTrack("next")}
        />
      </div>
      <div className="repeat">
        <FontAwesomeIcon
          className="text-[#b3b3b3] transition  duration-300 ease-in-out hover:text-white"
          icon={faRepeat}
        />
      </div>
    </div>
  );
}
