import React from "react";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";

export default function Volume() {
  const [{ token }] = useStateProvider();

  const setVolume = async (e) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume`,
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  return (
    <div className="flex justify-end content-center ">
      <input
        className="w-[15rem] rounded-[2rem] h-[0.5rem]"
        type="range"
        min={0}
        max={100}
        onMouseUp={(e) => setVolume(e)}
      />
    </div>
  );
}
