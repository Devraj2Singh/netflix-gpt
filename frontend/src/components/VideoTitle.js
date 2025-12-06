import React from 'react';
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] md:px-24 px-6 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>

      <p className="hidden md:inline-block pt-6 text-lg w-1/4 text-gray-200 drop-shadow-lg">
        {overview}
      </p>

      {/* Buttons Row */}
      <div className="flex items-center gap-4 mt-6">

        {/* Play Button */}
        <button className="flex items-center my-2 md:my-0 gap-1 bg-white text-black font-bold py-1 px-4 md:py-3 md:px-8  text-lg rounded-md shadow-xl hover:bg-gray-200 transition">
          <FaPlay size={18} />
          Play
        </button>

        {/* More Info Button */}
        <button className="hidden md:inline-block flex items-center gap-2 bg-gray-700 bg-opacity-60 text-white font-semibold py-1 px-6 text-lg rounded-md hover:bg-opacity-80 transition">
          <AiOutlineInfoCircle size={21}/>
          More Info
        </button>

      </div>
    </div>
  );
};

export default VideoTitle;
