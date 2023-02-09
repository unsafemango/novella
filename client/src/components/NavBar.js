import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { AiFillHome } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import DropDown from "./DropDown";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const ddItems = [
    { id: 1, value: "Account", link: "/account" },
    { id: 2, value: "Logout" },
  ];

  useEffect(() => {}, [user]);

  return (
    <nav>
      <div className="logo" role="button" onClick={() => navigate("/")}>
        Novella
        <img src={logo} alt="logo" className="nav--logo" />
      </div>
      <ul>
        <div className="nav-link">
          <button onClick={() => navigate("/")} className="btn">
            <AiFillHome className="nav-icon" />
          </button>
        </div>

        {user.payload ? (
          <div className="nav-link add-post">
            <button onClick={() => navigate("/submit")} className="btn">
              <IoAdd className="nav-icon" />
            </button>
          </div>
        ) : (
          ""
        )}

        {user.payload ? (
          ""
        ) : (
          <div className="nav-link">
            <h4
              role="button"
              onClick={() => navigate("/register")}
              className="btn"
            >
              Register
            </h4>
          </div>
        )}

        {user.payload ? (
          <div className="nav-link--dd">
            <DropDown ddItems={ddItems} />
          </div>
        ) : (
          <div className="nav-link">
            <h4
              role="button"
              onClick={() => navigate("/login")}
              className="btn"
            >
              Login
            </h4>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
