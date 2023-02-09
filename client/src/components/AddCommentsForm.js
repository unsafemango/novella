import { useSelector } from "react-redux";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const AddCommentsForm = ({ post, onPostUpdated }) => {
  const { user } = useSelector((state) => state.user);
  const [content, setContent] = useState("");

  const addComment = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      data: {
        username: user.payload.username,
        comment: content,
      },
      withCredentials: true,
      url: `http://localhost:4000/api/posts/add-comment/${post._id}`,
    }).then((res) => {
      console.log("====================================");
      console.log(res.data);
      console.log("====================================");
      const updatedPost = res.data;
      onPostUpdated(updatedPost);
    });

    setContent("");
  };

  return (
    <>
      <div className="single-post-interact">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          style={{ width: "100%" }}
          placeholder="What are your thoughts?"
        />
        <button className="btn btn-form mt mb" onClick={addComment}>
          Post
        </button>
      </div>
    </>
  );
};

export default AddCommentsForm;
