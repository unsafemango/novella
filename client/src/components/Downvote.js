import { BiDownvote } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Downvote = ({ post, addDownvote }) => {
  const style = { fontSize: "1.5rem" };
  const { user } = useSelector((state) => state.user);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(
    () => {
      if (user.payload) {
        var username = user.payload.username;
        if (post.downvoteIds) {
          if (post.downvoteIds.includes(username)) {
            setIsClicked(true);
          }
        }
      }
    },
    [post.downvoteIds, user.payload],
    isClicked
  );

  return (
    <>
      <div className="post-downvote">
        <p>{post.downvote} </p>
        <div
          className={`post-btn ${isClicked ? "active-downvote" : ""}`}
          data-key={post._id}
          role="button"
          onClick={addDownvote}
        >
          <BiDownvote style={style} />
        </div>
      </div>
    </>
  );
};

export default Downvote;
