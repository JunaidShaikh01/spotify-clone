import React from "react";
import { useStateProvider } from "../../utils/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [{ userInfo }] = useStateProvider();
  console.log("Username from Navbar", userInfo);
  return (
    <div className="flex justify-between items-center p-[2rem] h-[15vh] sticky top-0 transition duration-300 ease-in-out bg-none">
      <div className="search_bar bg-white w-[30%] py-[0.4rem] px-[1rem] rounded-[2rem] flex items-center gap-[0.5rem] ">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          className="border-none h-[2rem] w-[100%] focus:outline-none "
          type="text"
          placeholder="Artists, songs, or podcasts"
        />
      </div>
      <div className="avatar bg-black py-[0.3rem] px-1 pr-[2rem] rounded-[2rem] flex justify-center items-center ">
        <a
          href=""
          className="flex justify-center items-center gap-[0.5rem] text-white font-bold "
        >
          <FontAwesomeIcon
            icon={faUser}
            className="text-[1.3rem] bg-[#282828] p-[0.2rem] rounded-[1rem] text-[#c7c5c5]"
          />
          <span>{userInfo?.username}</span>
        </a>
      </div>
    </div>
  );
}
