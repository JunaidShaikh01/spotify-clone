import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar/Navbar";
import Body from "./Body";
import SpotifyFooter from "../Footer/SpotifyFooter";

export default function Spotify() {
  return (
    <div className="max-w-screen max-h-screen overflow-hidden grid grid-rows-[85vh_15vh]">
      <div className="spotify_body grid grid-cols-[15vw_85vw] h-full w-full bg-gradient-to-b from-transparent to-black bg-[#205764]">
        <Sidebar />
        <div className="body">
          <Navbar />
          <div className="body_container">
            <Body />
          </div>
        </div>
      </div>
      <div className="spotify_footer">
        <SpotifyFooter />
      </div>
    </div>
  );
}
