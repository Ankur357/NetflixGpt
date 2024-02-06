import { IMG_CDN } from "../Utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-40 pr-4">
      <img alt="Movie-card" src={IMG_CDN + posterPath} />
    </div>
  );
};

export default MovieCard;
