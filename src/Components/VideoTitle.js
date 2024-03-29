const VideoTitle = ({ title, overview }) => {
  return (
    <div className="-mt-20 w-screen aspect-video pt-[20%] px-10 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block p-6 text-lg w-1/3">{overview}</p>
      <div className="my-2 md:m-0">
        <button className="bg-white text-black py-2 md:py-4 px-3 mid:px-12 text-xl rounded-lg hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 text-white p-4 px-12 bg-opacity-50 rounded-lg hover:bg-opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
