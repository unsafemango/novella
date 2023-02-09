import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Account from "./views/Account";
import CreatePost from "./views/CreatePost";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Register from "./views/Register";
import SinglePost from "./views/SinglePost";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.user);
  const account = user.payload;
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<Home />} />
            {account ? <Route path="/account" element={<Account />} /> : ""}
            {account ? <Route path="/submit" element={<CreatePost />} /> : ""}
            {account ? "" : <Route path="/login" element={<Login />} />}
            <Route path="/register" element={<Register />} />
            <Route path="/post/:postId" element={<SinglePost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
