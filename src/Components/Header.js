import { useNavigate } from "react-router-dom";
import { auth } from "../Utils/firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../Utils/userSlice";
import { LOGO } from "../Utils/constant";
import { addGptMoviesResult, toggleGptSearch } from "../Utils/gptSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // when component unmount
    return () => unsubscribe();
  }, []);

  const handleGptSearch = () => {
    dispatch(toggleGptSearch());
    dispatch(addGptMoviesResult({ movieName: null, movieResults: null }));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="img"></img>
      {user && (
        <div className="flex p- justify-between">
          <button
            onClick={handleGptSearch}
            className="p-2 py-2 m-2 bg-red-600 text-white rounded-lg"
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          {/* <img className="w-10 h-12" src={user.photoURL} alt="img" /> */}
          <button
            onClick={handleSignOut}
            className="font-bold p-2 py-2 m-2 bg-gray-700 text-white rounded-lg"
          >
            Signout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
