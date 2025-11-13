import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";

export default function AddTask({ open, onClose, onAdd, taskToEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Prefill when editing
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [taskToEdit, open]);

  const handleAddOrEdit = () => {
    if (!title.trim()) return; // Title required
    onAdd({ title, description, id: taskToEdit?.id });
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{taskToEdit ? "Edit Task" : "Create a Task"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description (optional)"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleAddOrEdit} color="primary" variant="contained">
          {taskToEdit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}