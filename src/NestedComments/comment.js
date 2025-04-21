import React, { useState } from "react";

function Comment({ comment = "", onSubmitContent = () => {} }, onEditComment = () => {}, onDeleteComment = () => {}) {
  const { id: commentId, content, votes, timestamp, replies } = comment;
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  };

  const handleChange = ({ target: { value } }) => {
    setReplyContent(value);
  };

  const handleReplyContent = () => {
    if(replyContent) {
      onSubmitContent(commentId, replyContent);
      setReplyContent("");
    }
  };

  return (
    <div className="comment">
      <>
        <p className="comment-content">{content}</p>
        <p className="comment-info">Votes: {votes}</p>
        <p className="comment-info">{new Date(timestamp).toLocaleString()}</p>
      </>
      <div className="comment-actions">
        <button className="comment-button" onClick={toggleExpand}>
          {expand ? "Hide replies" : "Reply"}
        </button>
        <button className="comment-button" onClick={onEditComment}>Edit</button>
        <button className="comment-button" onClick={onDeleteComment}>Delete</button>
      </div>
      {expand && (
        <>
          <div className="comment-replies">
            <div className="add-comment">
              <textarea
                value={replyContent}
                rows={3}
                cols={50}
                placeholder="Add a comment..."
                className="comment-textarea"
                onChange={handleChange}
              />
              <button className="comment-button" onClick={handleReplyContent}>
                Add Comment
              </button>
            </div>
            {replies?.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onSubmitContent={onSubmitContent}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Comment;
