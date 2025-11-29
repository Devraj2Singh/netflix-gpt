import { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector  } from "react-redux";

const Header = () => {
  const navigate = useNavigate(); 
  const user = useSelector((store) => store.user);

  const handleSignOut = ()=>{
    signOut(auth).then(() => {
        navigate("/")
      }).catch((error) => {
        // An error happened.
        navigate("/error")
      });
  } 
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

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <img
        className="w-44"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
 {user &&(
      <div className="relative flex items-center gap-2" ref={menuRef}>
        {/* Avatar + Arrow + Menu */}
     
        {/* Avatar */}
        <img
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 rounded cursor-pointer"
          src={user?.photoURL}
          alt="usericon"
        />

        {/* Arrow Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-white text-xl font-bold cursor-pointer"
        >
          ▼
        </button>

        {/* Popup Menu */}
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
