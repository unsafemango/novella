import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux/userReducer";

const DropDown = ({ ddItems }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const navigate = useNavigate();

  function handleOnClick(item) {
    if (item.value.toLowerCase() === "logout") {
      axios({
        method: "post",
        withCredentials: true,
        url: "http://localhost:4000/api/logout",
      }).then((res) => {
        console.log(res);
        navigate("/login");
        dispatch(getUser({}));
      });
    } else {
      navigate(item.link);
    }
  }

  const account = user.payload ? user.payload : null;

  return (
    <div className="dd-wrapper">
      <div
        className="dd-header"
        tabIndex={0}
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          {account ? (
            <p className="dd-header__title--bold"> {account.username} </p>
          ) : (
            ""
          )}
        </div>
        <div className="dd-header__action">
          <p>{open ? <AiFillCaretUp /> : <AiFillCaretDown />}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {ddItems.map((item) => (
            <li className="dd-list-item" key={item.id}>
              <button
                type="button"
                className=""
                onClick={() => handleOnClick(item)}
              >
                {item.value}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
