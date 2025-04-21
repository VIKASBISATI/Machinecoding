import { useState } from "react";

const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  const insertNode = (commentNodeId, tree, content) => {
    return tree.map((comment) => {
      const { id: commentId, replies } = comment;
      if (commentId === commentNodeId) {
        return {
          ...comment,
          replies: [...replies, content],
        };
      } else if (!!replies?.length) {
        return {
          ...comment,
          replies: insertNode(commentNodeId, replies, content),
        };
      }
      return comment;
    });
  };

  const insertComment = (commentId, content) => {
    const newComment = {
      id: Date.now(),
      votes: 0,
      content,
      timestamp: new Date().toISOString(),
      replies: [],
    };
    if (commentId) {
      setComments((prevComments) =>
        insertNode(commentId, prevComments, newComment)
      );
    } else {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  const editNode = (nodeId, tree, content) => {
    return tree.map(node => {
      const { id: commentId, replies } = node;
      if(commentId === nodeId) {
        return {
          ...node,
          timestamp: new Date().toISOString(),
          content
        }
      }else if(replies?.length) {
        return {
          ...node,
          replies: editNode(nodeId, replies, content)
        }
      }
      return node;
    })
  }

  const editComment = (commentId, content) => {
    setComments((prevComments) => editNode(commentId, prevComments, content));
  };

  const deleteNode = (nodeId, tree) => {
    
  }

  const deleteComment = (commentId) => {
    setComments(prevComments => deleteNode(commentId, prevComments));
  }

  return {
    comments,
    insertComment,
    editComment,
    deleteComment
  };
};

export default useCommentTree;
