import React, { useEffect, useLayoutEffect } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";

export default function Body() {
  const [{ token } , dispatch] = useStateProvider();
  useEffect(() => {
    const getInitialPlaylist = async()=>{
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${sele}`)
    }
  }, [token , dispatch]);

  return <div></div>;
}
