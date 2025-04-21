import React, { useState } from "react";
import useCommentTree from "../hooks/useCommentTree";
import Comment from "./comment";

function NestedComments({ comments, onSubmit, onDelete, onEdit }) {
  const [comment, setComment] = useState("");
  const {
    comments: commentsData,
    insertComment,
    editComment,
    deleteComment,
  } = useCommentTree(comments);

  const handleChange = ({ target: { value } }) => {
    setComment(value);
  };

  const handleReply = (commentId, content) => {
    insertComment(commentId, content);
  };

  const handleSubmit = () => {
    if (comment) {
      handleReply(undefined, comment);
      setComment("");
    }
  };

  const handleEdit = (commentId, content) => {
    editComment(commentId, content);
    onEdit(content);
  };

  const handleDelete = (commentId) => {
    onDelete(commentId);
  };

  return (
    <>
      <div className="add-comment">
        <textarea
          value={comment}
          rows={3}
          cols={50}
          placeholder="Add a comment..."
          className="comment-textarea"
          onChange={handleChange}
        />
        <button className="comment-button" onClick={handleSubmit}>
          Add Comment
        </button>
      </div>
      {commentsData.map((comment) => {
        return (
          <Comment
            key={comment.id}
            onSubmitComment={handleReply}
            onEditComment={handleEdit}
            onDeleteComment={handleDelete}
          />
        );
      })}
    </>
  );
}

export default NestedComments;
// └── root
//     ├── src
//     │   ├── index.tsx
//     │   ├── App.tsx
//     │   └── components
//     │       ├── Header.tsx
//     │       └── Footer.tsx
//     ├── public
//     │   └── index.html
//     └── package.json


//     function printTree(node, prefix = "", isLast = true) {
//         console.log(`${prefix}${isLast ? "└── " : "├── "}${node.name}`);
      
//         const children = node.children || [];
//         const newPrefix = prefix + (isLast ? "    " : "│   ");
      
//         children.forEach((child, idx) => {
//           const isLastChild = idx === children.length - 1;
//           printTree(child, newPrefix, isLastChild);
//         });
//       }