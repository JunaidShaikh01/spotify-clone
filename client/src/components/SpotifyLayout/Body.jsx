import React, { useEffect } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
export default function Body({ headerBackground }) {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      console.log("Selected Playlist id", selectedPlaylistId);
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response: ", response);
        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
          image: response.data.images[0].url,
          tracks: response.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name.split("(")[0].trim(),

            // artists: track.artists.map((artist) => artist.name[0]),
            artists: track.artists[0].name,
            image: track.album.images[2].url,
            duration: track.duration_ms,
            album: track.album.name.split("(")[0].trim(),
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
        };
        console.log("name", selectedPlaylist);
        console.log("name inside trank", selectedPlaylist.tracks.name);

        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
      } catch (error) {
        console.error(error);
      }
    };
    if (token && selectedPlaylistId) {
      getInitialPlaylist();
    }
  }, [token, dispatch, selectedPlaylistId]);

  return (
    <div>
      {selectedPlaylist && (
        <>
          <div className="playList mx-[2rem] flex items-center gap-[2rem]">
            <div className="Image ">
              <img
                src={selectedPlaylist.image}
                alt="Selected PlayList"
                srcset=""
                className="h-[15rem] shadow-custom"
              />
            </div>
            <div className="details flex flex-col gap-[1rem] text-[#e0dede]">
              <span className="type">PLAYLIST</span>
              <h1 className="title text-white text-4xl">
                {selectedPlaylist.name}
              </h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div
              className={`header_row flex gap-4 mt-[1rem] text-[#dddcdc] sticky top-[15vh] py-[1rem] px-[3rem] transition-all duration-300 ease-in-out ${
                headerBackground ? "bg-[#000000dc]" : "bg-none"
              }`}
            >
              <div className="col flex-grow-[30] basis-[0px] ">
                <span>#</span>
              </div>
              <div className="col flex-grow-[300] basic-[0px]">
                <span>TITLE</span>
              </div>
              <div className="col flex-grow-[200] basic-[0px]">
                <span>ALBUM</span>
              </div>
              <div className="col flex-grow-[10] basic-[0px]">
                <FontAwesomeIcon icon={faClock} />
              </div>
            </div>
            <div className="tracks my-[2rem] flex flex-col mb-[5rem] ">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  const msToMinutesAndSeconds = (ms) => {
                    var minutes = Math.floor(ms / 60000);
                    var seconds = ((ms % 60000) / 1000).toFixed(0);
                    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
                  };

                  return (
                    <div
                      className="row flex gap-4 py-[1rem] px-[3rem] hover:bg-[rgba(0,0,0,0.7)] "
                      key={id}
                    >
                      <div className="col flex-grow-[30] basis-[0px] flex items-center text-[#dddcdc]">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col flex-grow-[250] basic-[0px] detail flex items-center text-[#dddcdc] gap-[1rem]">
                        <div className="image">
                          <img
                            src={image}
                            alt="track"
                            srcset=""
                            className="h-[40px] w-[40px]"
                          />
                        </div>
                        <div className="info flex flex-col">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col flex-grow-[200] basic-[0px] flex items-center    text-[#dddcdc]">
                        <span>{album}</span>
                      </div>
                      <div className="col flex-grow-[10] basic-[0px] flex items-center text-[#dddcdc]">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
