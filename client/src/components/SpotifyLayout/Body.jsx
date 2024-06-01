import React, { useEffect } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../../utils/constants";
export default function Body() {
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
        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
          image: response.data.images[0].url,
          tracks: response.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => {
              artist.name;
            }),
            image: track.album.images[2].url,
            duration: track.duration,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
        };
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
            <div className="Image h-[15rem]">
              <img
                src={selectedPlaylist.image}
                alt="Selected PlayList"
                srcset="" className="shae"
              />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header_row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>#</span>
              </div>
            </div>
            <div className="tracks">
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
                  return (
                    <div className="row" key={id}>
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" srcset="" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{duration}</span>
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
