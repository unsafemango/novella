import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import PostButtons from "./PostButtons";

const Post = ({ post, addUpvote, addDownvote }) => {
  return (
    <>
      <div className="post">
        <Link className="post-link-item" to={`/post/${post._id}`} key={uuid()}>
          <p>Posted by {post.user_id}</p>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-content">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            ></div>
          </div>
        </Link>
        <PostButtons
          post={post}
          addUpvote={addUpvote}
          addDownvote={addDownvote}
        />
      </div>
    </>
  );
};

export default Post;
