import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Grid,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { updateNote } from "../../store/todo/todoSlice"; // Ensure you have the correct path
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 400,
  bgcolor: "background.paper",
  borderRadius: "1rem",
  border: "1px solid rgba(0,0,0,0.25)",
  boxShadow: 12,
  p: 4,
};

const EditNote = ({ note }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(note?.title || "");
  const [description, setDescription] = useState(note?.description || "");
  const [deadline, setDeadline] = useState(note?.deadline || "");
  const [priority, setPriority] = useState(note?.priority || 1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
      setDeadline(note.deadline);
      setPriority(note.priority);
    }
  }, [note]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      toast.warn("Please Enter the Details");
      return;
    }
    const updatedNote = {
      ...note,
      title,
      description,
      deadline,
      priority,
    };
    dispatch(updateNote(updatedNote));
    toast.success("Note updated successfully");
    handleClose();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "title") setTitle(value);
    else if (id === "description") setDescription(value);
    else if (id === "deadline") setDeadline(value);
    else if (id === "priority") setPriority(value);
  };

  if (!note) {
    return null; // or render a message indicating that the note is not available
  }

  return (
    <div>
      <IconButton color="primary" onClick={handleOpen}>
        <EditIcon style={{color:'#67339e'}} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Edit Note
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="title">Title</InputLabel>
                      <Input
                        id="title"
                        aria-describedby="title"
                        value={title}
                        onChange={handleChange}
                      />
                      <FormHelperText id="title">Enter the note title.</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="description">Description</InputLabel>
                      <Input
                        id="description"
                        aria-describedby="description"
                        value={description}
                        onChange={handleChange}
                      />
                      <FormHelperText id="description">Enter the note description.</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="deadline">Deadline</InputLabel>
                      <Input
                        id="deadline"
                        type="date"
                        aria-describedby="deadline"
                        value={deadline}
                        onChange={handleChange}
                        inputProps={{
                          min: new Date().toISOString().split("T")[0],
                        }}
                      />
                      <FormHelperText id="deadline">Enter the deadline.</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="priority">Priority</InputLabel>
                      <Select
                        id="priority"
                        value={priority}
                        onChange={handleChange}
                      >
                        <MenuItem value={3}>High</MenuItem>
                        <MenuItem value={2}>Medium</MenuItem>
                        <MenuItem value={1}>Low</MenuItem>
                      </Select>
                      <FormHelperText id="priority">Select the priority.</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ backgroundColor: '#67339e' }}
                      fullWidth
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleClose}
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default EditNote;
