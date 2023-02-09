import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useUser from "../hooks/useUser";
import axios from "axios";

const CreatePost = () => {
  const { user } = useSelector((state) => state.user);
  const [title] = useState("Create Post");
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");
  const { isLoading } = useUser();

  const navigate = useNavigate();

  const post = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      data: {
        user_id: user.payload.username,
        title: postTitle,
        content: content,
        upvote: 0,
        downvote: 0,
        comments: [],
      },
      withCredentials: true,
      url: "http://localhost:4000/api/add-post",
    }).then((res) => {
      console.log(res);
      navigate("/");
    });
  };

  useEffect(() => {
    document.title = title;
    console.log("====================================");
    console.log(isLoading);
    console.log("====================================");
    console.log(user.payload);
  }, [title, content, isLoading, user]);

  return (
    <>
      <div className="content">
        <h1>Add post</h1>
        <div className="create-post">
          <div className="mb">
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            style={{ width: "100%" }}
            placeholder="What are your thoughts?"
          />
          <button className="btn btn-form mt" onClick={post}>
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
