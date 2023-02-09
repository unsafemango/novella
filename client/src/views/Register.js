import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";

const Register = () => {
  const { user } = useSelector((state) => state.user);
  const [title] = useState("Register");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading } = useUser();

  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      data: {
        username: username,
        email: email,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:4000/api/register",
    }).then((res) => {
      console.log(res);
      navigate("/login");
    });
  };

  useEffect(() => {
    document.title = title;
    console.log(user.payload);
    if (!isLoading) {
      user.payload ? navigate("/") : navigate("/register");
    }
  }, [title, user, navigate, isLoading]);

  return (
    <>
      <div className="content">
        <h1>Register</h1>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
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
          <button className="btn btn-form" onClick={register}>
            Register
          </button>
        </div>
        <p>
          Already have an account?{" "}
          <span
            className="link"
            role="button"
            onClick={() => navigate("/login")}
          >
            Log in here.
          </span>
        </p>
      </div>
    </>
  );
};

export default Register;
