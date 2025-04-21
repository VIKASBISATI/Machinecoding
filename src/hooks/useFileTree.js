import React, { useState } from "react";

const UseFileTree = (initialFileData) => {
  const [fileData, setFileData] = useState(initialFileData);

  const addNode = (fileTree, id, content) => {
    return fileTree.map(file => {
      const { id: fileId, children } = file;
      if(fileId === id) {
        return {
          ...file,
          children: [...children, content]
        }
      }else if(!!children?.length) {
        return {
          ...file,
          children: addNode(children, id, content)
        }
      }
      return file;
    })
  }

  const editNode = (fileTree, id, content) => {
    return fileTree.map(file => {
      const { id: fileId, children } = file;
      if(fileId === id) {
        return {
          ...file,
          id: Date.now(),
          name: content
        }
      }else if(!!children?.length) {
        return {
          ...file,
          children: editNode(children, id, content)
        }
      }
      return file;
    })
  }

  const deleteNode = (fileTree, id) => {
    return fileTree.reduce((acc, node) => {
      const { id: fileId, children } = node;
      if(fileId === id) {
        return acc;
      }else if(!!children?.length) {
        node.children = deleteNode(children, id)
      }
      return [...acc, node];
    }, [])
  }

  const deleteFile = (id) => {
    setFileData(prevFileData => deleteNode(prevFileData, id))
  };

  const editFile = (id, content) => {
    setFileData(prevFileData => editNode(prevFileData, id, content))
  };

  const addNewFile = (id, name) => {
    const content = {
      id: Date.now(),
      name: name,
      children: []
    }
    setFileData(prevFileData => addNode(prevFileData, id, content))
  };



  return {
    fileData,
    addNewFile,
    editFile,
    deleteFile
  };
};

export default UseFileTree;
