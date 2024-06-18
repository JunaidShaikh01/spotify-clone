import React from "react";

export default function Login() {
  const handleClick = () => {
    const client_id = "92a9ac844c8d4a0bbbd8b68d45447f15";
    const redirect_uri = "https://spotify-clone-snowy-ten.vercel.app/";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-spotifyGreen gap-[5rem]">
      <img
        className="h-20vh"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Black.png"
        alt="Spotify"
      />
      <button
        className="py-4 px-20 bg-black  rounded-[5rem] border-none cursor-pointer text-buttonGreen text-[1.4rem]"
        onClick={handleClick}
      >
        Connet Spotify
      </button>
    </div>
  );
}
