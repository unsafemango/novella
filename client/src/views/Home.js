import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { postList } from "../redux/postReducer";
import Post from "../components/Post";
import uuid from "react-uuid";
import useUser from "../hooks/useUser";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [title] = useState("Home | Novella");
  const { isLoading } = useUser();
  const navigate = useNavigate();
  // const content = useRef([{}]);

  var content;

  // var content;

  // function to add upvote from the posts list view
  const addUpvote = (e) => {
    e.preventDefault();
    const btn = e.target.parentNode;
    const postID = btn.dataset.key;

    if (user.payload) {
      axios({
        method: "put",
        withCredentials: true,
        url: `http://localhost:4000/api/posts/${postID}/upvote`,
      }).then((res) => {
        const updatedPost = res.data;
        dispatch(postList(updatedPost));
      });
    } else {
      navigate("/login");
    }
  };

  // function to add downvote from the posts list view
  const addDownvote = (e) => {
    e.preventDefault();
    const btn = e.target.parentNode;
    const postID = btn.dataset.key;

    if (user.payload) {
      axios({
        method: "put",
        withCredentials: true,
        url: `http://localhost:4000/api/posts/${postID}/downvote`,
      }).then((res) => {
        const updatedPost = res.data;
        dispatch(postList(updatedPost));
      });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    document.title = title;

    async function getPosts() {
      axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:4000/api/posts",
      }).then((res) => {
        const newPosts = res.data;
        dispatch(postList(newPosts));
        console.log(user.payload);
      });
    }

    console.log("rendered");
    getPosts();
  }, [dispatch, title, isLoading, user]);

  if (post.payload) {
    content = [...post.payload];
    content = content.reverse();
    console.log(post.payload);
    console.log("here i am");
  }

  return (
    <>
      <div className="content">
        {content
          ? content.map((post) => (
              <Post
                post={post}
                key={uuid()}
                addUpvote={addUpvote}
                addDownvote={addDownvote}
              />
            ))
          : "Loading..."}
      </div>
    </>
  );
};

export default Home;
