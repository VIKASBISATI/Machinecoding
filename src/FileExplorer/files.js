import React, { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import AddEditFile from "./addEditFile";

const Files = ({
  file,
  prefix,
  onAddNewFile = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const { id: fileId, name, children } = file;

  const [toggleFolder, setToggleFolder] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isFolder = children.length > 0;
  const icon = isFolder ? <span>&#128193;</span> : <span>&#128196;</span>;
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if(openDialog) {
      setAnchorEl(null);
    }
  }, [openDialog])

  const toggleShowChildren = () => {
    setToggleFolder((prevToggleFolder) => !prevToggleFolder);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    console.log("here");
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialog = () => {
    setOpenDialog(prevOpenDialog => !prevOpenDialog);
    if(isEdit) {
      setIsEdit(false);
    }
  }

  const handleAddNewFile = (content) => {
    console.log(content, fileId, onAddNewFile);
    
    onAddNewFile(fileId, content);
  };

  const handleEdit = () => {
    setIsEdit(true);
    setOpenDialog(true);
  };

  const handleOnEdit = (content) => {
    onEdit(fileId, content)
  }

  const handleDelete = () => {
    onDelete(fileId);
  };

  const renderFileActions = () => {
    return (
      <div className="file-actions">
        <Button variant="contained" onClick={handleDialog}>
          + Add new file
        </Button>
        <Button variant="contained" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          whiteSpace: "pre",
          fontFamily: "monospace",
          width: "fit-content",
        }}
        {...(isFolder ? { onContextMenu: handleContextMenu } : {})}
      >
        <span>{prefix}</span>
        <span>|--</span>
        <>
          <span onClick={toggleShowChildren} className="pointer">
            {icon}
          </span>
          <span className={isFolder ? "pointer" : ""}>{name}</span>
        </>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          {renderFileActions()}
        </Popover>
        <AddEditFile open={openDialog} isEdit={isEdit} onAdd={handleAddNewFile} onEdit={handleOnEdit} onClose={handleDialog} />
      </div>

      <div className={toggleFolder ? "opa-1" : "opa-0"}>
        {children?.map((nestedFiles, i) => {
          return (
            <Files
              key={nestedFiles.id}
              file={nestedFiles}
              prefix={prefix + "|   "}
              isLast={i === children.length - 1}
              onAddNewFile={onAddNewFile}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Files;
