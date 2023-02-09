import DOMPurify from "dompurify";

const CommentsList = ({ comments }) => {
  return (
    <>
      <h3>Comments:</h3>
      {comments.map((comment) => (
        <div className="comment" key={comment._id}>
          <p className="comment-username">{comment.username}</p>
          <div className="comment-content">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(comment.comment),
              }}
            ></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentsList;
