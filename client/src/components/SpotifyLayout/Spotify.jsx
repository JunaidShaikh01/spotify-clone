import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar/Navbar";
import Body from "./Body";
import SpotifyFooter from "../Footer/SpotifyFooter";
import axios from "axios";
import { useStateProvider } from "../../utils/StateProvider";
import { reducerCases } from "../../utils/constants";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const getUserINfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const userInfo = {
        userId: data.id,
        username: data.display_name,
      };

      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserINfo();
  }, [dispatch, token]);

  return (
    <div className="max-w-screen max-h-screen overflow-hidden grid grid-rows-[85vh_15vh]">
      <div className="spotify_body grid grid-cols-[15vw_85vw] h-full w-full bg-gradient-to-b from-transparent to-black bg-[#205764]">
        <Sidebar />
        <div className="body overflow-auto scrollbar-thin scrollbar-thumb-gray-400">
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
