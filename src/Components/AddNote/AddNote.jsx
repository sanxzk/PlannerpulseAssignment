import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  styled,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { dispatchAddNote } from "../../store/todo/todoSlice";
import { toast } from "react-toastify";

// Custom styled components to customize outline color
const RedOutlinedInput = styled("input")({
  border: "1px solid red",
  padding: "10px", // adjust padding as needed
  borderRadius: "4px", // adjust border radius as needed
});

const RedInputLabel = styled(InputLabel)({
  color: "red",
});

const AddNote = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (e.target.value.trim() !== "") {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleSave = () => {
    if (title && description && deadline && priority) {
      // Generate unique ID using timestamp
      const timestamp = new Date().getTime();
      const newNote = {
        id: `note_${timestamp}`, // Unique ID based on timestamp
        title,
        description,
        completed: false,
        deadline,
        priority,
      };
      dispatch(dispatchAddNote(newNote));
      toast.success("Note added");
      // Clear form
      setTitle("");
      setDescription("");
      setDeadline("");
      setPriority("");
      setShowOptions(false);
    }
  };

  // Function to get today's date in yyyy-mm-dd format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  return (
    <Box sx={{ p: 2, maxWidth: 800, margin: "0.5rem 0", mx: "auto" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{
              inputComponent: RedOutlinedInput, // Using custom styled input component
            }}
            InputLabelProps={{
              shrink: true,
              classes: {
                root: "red-outline", // Adding a class to root element for custom styles
              },
              className: "red-label", // Adding a class name for custom label styles
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            size="small"
            value={description}
            onChange={handleDescriptionChange}
            InputProps={{
              inputComponent: RedOutlinedInput, // Using custom styled input component
            }}
            InputLabelProps={{
              shrink: true,
              classes: {
                root: "red-outline", // Adding a class to root element for custom styles
              },
              className: "red-label", // Adding a class name for custom label styles
            }}
          />
        </Grid>
      </Grid>
      {showOptions && (
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel
                classes={{
                  root: "red-outline", // Adding a class to root element for custom styles
                }}
                className="red-label" // Adding a class name for custom label styles
              >
                Priority
              </InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
                size="small"
              >
                <MenuItem value={3}>High</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={1}>Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Deadline"
              variant="outlined"
              fullWidth
              size="small"
              type="date"
              InputLabelProps={{
                shrink: true,
                classes: {
                  root: "red-outline", // Adding a class to root element for custom styles
                },
                className: "red-label", // Adding a class name for custom label styles
              }}
              inputProps={{
                min: getTodayDate(),
                className: "red-outline", // Adding a class to input element for custom styles
              }}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </Grid>
          <Grid sx={{ margin: "auto" }} item xs={6} sm={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSave}
              disabled={!title || !description || !deadline || !priority}
              sx={{
                height: "100%",
                backgroundColor: "#67339e",
                fontSize: "0.75rem",
              }}
            >
              Save Note
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default AddNote;
