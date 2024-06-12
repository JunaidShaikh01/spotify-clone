import React from "react";
import CurrentTrack from "../Tracks/CurrentTrack";
import PlayerConrols from "../PlayerControls/PlayerConrols";
import Volume from "../PlayerControls/Volume";

export default function SpotifyFooter() {
  return (
    <div className="h-[100%] w-[100%] bg-[#181818] border-t-[1px] border-[#282828] grid grid-cols-[1fr_2fr_1fr] items-center justify-center py-0 px-[1rem]">
      <CurrentTrack />
      <PlayerConrols />
      <Volume/>
    </div>
  );
}
