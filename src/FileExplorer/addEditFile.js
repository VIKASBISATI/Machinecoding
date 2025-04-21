import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddEditFile({ open, isEdit, onAdd = () => {}, onEdit= () => {}, onClose }) {
  const [fileName, setFileName] = useState("");

  const handleChange = ({ target: { value } }) => {
    setFileName(value);
  };

  const handleClick = () => {
    if(isEdit) {
      onEdit(fileName)
    }
    onAdd(fileName);
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add new file</DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClick}>
          {isEdit ? "Edit": "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEditFile;
