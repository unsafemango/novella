import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userReducer";

const Login = () => {
  const dispatch = useDispatch();

  const [title] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:4000/api/login",
    }).then((res) => {
      if (res.data !== "No user exists") {
        console.log(res);
        dispatch(getUser(res.data));
        navigate("/");
      }
    });
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <div className="content">
        <h1>Login</h1>
        <form action="">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-form" onClick={login}>
              Login
            </button>
          </div>

          <p>
            Don't have an account?{" "}
            <span
              className="link"
              role="button"
              onClick={() => navigate("/register")}
            >
              Register here.
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
