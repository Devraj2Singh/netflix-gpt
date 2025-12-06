import { useState, useEffect, useRef } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Listen for user login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  const handleGptSearchClick = () => {
    //Toggle GPT Search button
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
   dispatch(changeLanguage(e.target.value))
   
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-center md:justify-between items-center">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />

      {user && (
        <div className="relative flex items-center gap-2" ref={menuRef}>
          {(showGptSearch && <select className="bg-gray-900 text-white px-3 py-2 rounded-lg" onChange={handleLanguageChange}>
           {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>)}

          <button
            className="text-white py-2 px-4 m-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
            onClick={handleGptSearchClick}
          >
           {showGptSearch? "Homepage" : "AI Search ✨"}
          </button>

          {/* Avatar */}
          <img
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 rounded cursor-pointer"
            src={user?.photoURL}
            alt="usericon"
          />

          {/* Arrow */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-white text-xl font-bold cursor-pointer"
          >
            ▼
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-12 w-40 bg-black text-white border border-gray-700 rounded-lg shadow-lg py-2 text-sm">
              <p
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer font-semibold text-red-500"
                onClick={handleSignOut}
              >
                Sign Out
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
