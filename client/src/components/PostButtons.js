import { FaRegCommentAlt } from "react-icons/fa";
import Downvote from "./Downvote";
import Upvote from "./Upvote";

const PostButtons = ({ post, addUpvote, addDownvote }) => {
  const comment_style = { marginRight: "4px", fontSize: "1.5rem" };
  return (
    <>
      <div className="post-interact">
        <Upvote post={post} addUpvote={addUpvote} />
        <Downvote post={post} addDownvote={addDownvote} />
        <div className="post-comments">
          <div className="post-btn">
            <FaRegCommentAlt style={comment_style} />
          </div>
          <p> {post.comments.length} Comments</p>
        </div>
      </div>
    </>
  );
};

export default PostButtons;
