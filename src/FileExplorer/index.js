import React from "react";
import Files from "./files";

import UseFileTree from "../hooks/useFileTree";

function FileExplorer({ files }) {
  const { fileData, addNewFile, editFile, deleteFile } = UseFileTree(files);

  const handleAddNewFile = (id, name) => {    
    addNewFile(id, name)
  }

  const handleEdit = (id, name) => {
    editFile(id, name)
  };

  const handleDelete = (id) => {
    deleteFile(id);
  };

  return (
    <div className="card">
      {fileData.map((file) => {
        return <Files key={file.id} file={file} prefix="" onAddNewFile={handleAddNewFile} onEdit={handleEdit} onDelete={handleDelete} />;
      })}
    </div>
  );
}

export default FileExplorer;
