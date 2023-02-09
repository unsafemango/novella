import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DOMPurify from "dompurify";
import axios from "axios";
import PostButtons from "../components/PostButtons";
import CommentsList from "../components/CommentsList";
import AddCommentsForm from "../components/AddCommentsForm";
import useUser from "../hooks/useUser";

const SinglePost = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isLoading } = useUser();
  const [post, setPost] = useState({
    comments: [],
  });
  const [title, setTitle] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();

  // function to add upvote from the single post view
  const addUpvote = (e) => {
    e.preventDefault();
    if (user.payload) {
      axios({
        method: "put",
        withCredentials: true,
        url: `http://localhost:4000/api/post/${post._id}/upvote`,
      }).then((res) => {
        const updatedPost = res.data;
        setPost(updatedPost);
      });
    } else {
      navigate("/login");
    }
  };

  // function to add upvote from the single post view
  const addDownvote = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (user.payload) {
      axios({
        method: "put",
        withCredentials: true,
        url: `http://localhost:4000/api/post/${post._id}/downvote`,
      }).then((res) => {
        const updatedPost = res.data;
        setPost(updatedPost);
      });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    document.title = title;
    async function getPost() {
      axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:4000/api/posts/${postId}`,
      })
        .then((res) => {
          const newPostInfo = res.data;
          setPost(newPostInfo);
          setTitle(`${post.title} | Novella`);
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status === 404) {
              navigate("/404");
            }
          }
        });
    }
    getPost();

    console.log("rendered");
    console.log(user.payload);
  }, [title, postId, dispatch, post.title, navigate, isLoading, user]);

  return (
    <>
      {post ? (
        <div className="content">
          <div className="single-post">
            <div className="single-post-content">
              <p>Posted by {post.user_id}</p>
              <h1 className="post-title">{post.title}</h1>
              <div className="post-content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content),
                  }}
                ></div>
              </div>
              <PostButtons
                post={post}
                addUpvote={addUpvote}
                addDownvote={addDownvote}
              />
            </div>
            {user.payload ? (
              <AddCommentsForm
                post={post}
                onPostUpdated={(updatedPost) => setPost(updatedPost)}
              />
            ) : (
              <p
                className="link"
                role="button"
                onClick={() => navigate("/login")}
              >
                Log in to comment, upvote and downvote
              </p>
            )}
            <CommentsList comments={post.comments} />
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default SinglePost;
