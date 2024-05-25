import React from "react";
// import { IoLibrary } from "react-icons";
// import { MdHomeFilled, MdSearch } from "react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
export default function Sidebar() {
  return (
    <div className="bg-black text-[#b3b3b3] flex flex-col h-[100%] w-[100%]">
      <div className="topLinks flex flex-col">
        <div className="logo text-center my-[1rem] ">
          <img
            className="max-w-[80%] h-auto"
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png"
            alt="Spotify Logo"
          />
        </div>
        <ul className="list-none flex flex-col gap-[1rem] p-[1rem]  ">
          <li className="flex gap-[1rem] cursor-pointer transition duration-300 ease-in-out hover:text-white items-center">
            <FontAwesomeIcon icon={faHouse} />
            <span>Home</span>
          </li>
          <li className="flex gap-[1rem] cursor-pointer transition duration-300 ease-in-out hover:text-white items-center">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span>Search</span>
          </li>
          <li className="flex gap-[1rem] cursor-pointer transition duration-300 ease-in-out hover:text-white items-center">
            <FontAwesomeIcon icon={faDatabase} />
            <span>Your Library</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
