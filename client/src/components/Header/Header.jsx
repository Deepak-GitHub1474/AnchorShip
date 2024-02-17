import { BASE_URL } from "../../config/config";
import { useJob } from "../../context/context";

import { BsCoin } from "react-icons/bs";

import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Header() {
  const { user, coins } = useJob();
  const location = useLocation();

  // User Logout
  const userLogout = () => {
    axios
      .get(`${BASE_URL}/logout`)
      .then((res) => {
        if (res.data.responseMsg === "Success") {
          window.location.href = "/register/login";
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {location.pathname !== "/register/login" && (
        <header className=" flex items-center justify-between  gap-2 pt-3 pb-12 px-3 bg-slate-100 relative">
          <img
            src="https://res.cloudinary.com/dlt4ash36/image/upload/v1707741622/developerstring_bn169n.png"
            alt="logo"
            className="w-28"
          />

          <>
            {!user.email ? (
              <Link to="/register/login">
                <button className=" w-fit py-2 px-6 font-semibold bg-[#e86969] hover:bg-[#ee5555] text-white">
                  Register/Login
                </button>
              </Link>
            ) : (
              <>
                <div className="flex gap-4 items-center">
                  <Link
                    to="/"
                    className={`w-fit hover:bg-slate-200 p-2 font-semibold text-center ${
                      location.pathname === "/" && "bg-slate-300"
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/profile"
                    className={`w-fit hover:bg-slate-200 p-2 font-semibold text-center ${
                      location.pathname === "/profile" && "bg-slate-300"
                    }`}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/internship"
                    className={`w-fit hover:bg-slate-200 p-2 font-semibold text-center ${
                      location.pathname === "/internship" && "bg-slate-300"
                    }`}
                  >
                    Internships
                  </Link>
                </div>
                <div className="dropdown dropdown-end xs:block hidden">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar w-12 h-12 rounded-full border-[1px] border-[#E97862] hover:border-2 hover:border-[#E97862] overflow-hidden cursor-pointer"
                  >
                    <img
                      src="https://res.cloudinary.com/dlt4ash36/image/upload/v1706377919/avatar_angxlv.png"
                      alt="profile-img"
                      className="object-contain"
                    />
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-1 z-[1] p-2 menu menu-sm dropdown-content w-48 bg-blue-100 shadow rounded-box"
                  >
                    {/* <li>
                      <Link
                        to="/account"
                        className="justify-between font-semibold"
                      >
                        Account
                      </Link>
                    </li> */}
                    <li onClick={userLogout}>
                      <a className="font-semibold">Logout</a>
                    </li>
                  </ul>
                </div>
                <div className=" bg-blue-600 w-fit px-4 py-2 text-lg font-semibold text-white absolute bottom-0 right-3 flex items-center gap-2">
                  <BsCoin className="animate-bounce text-yellow-300" />
                  {`Total Coins ${coins}`}
                </div>
              </>
            )}
          </>
        </header>
      )}
    </>
  );
}
export default Header;
