import { BiUpvote } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Upvote = ({ post, addUpvote }) => {
  const style = { fontSize: "1.5rem" };
  const { user } = useSelector((state) => state.user);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (user.payload) {
      var username = user.payload.username;
      if (post.upvoteIds) {
        if (post.upvoteIds.includes(username)) {
          setIsClicked(true);
        } else {
          setIsClicked(false);
        }
      }
    }
  }, [post.upvoteIds, user.payload]);

  return (
    <>
      <div className="post-upvote">
        <div
          className={`post-btn ${isClicked ? "active-upvote" : ""}`}
          data-key={post._id}
          role="button"
          onClick={addUpvote}
        >
          <BiUpvote style={style} />
        </div>
        <p> {post.upvote}</p>
      </div>
    </>
  );
};

export default Upvote;
