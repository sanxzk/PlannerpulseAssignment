import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  IconButton,
  styled,
  Grid,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import EventIcon from "@mui/icons-material/Event";
import { useDispatch } from "react-redux";
import { deleteNote, markAsComplete } from "../../store/todo/todoSlice";
import { toast } from "react-toastify";
import EditNote from "../EditNote/EditNote";

const TodoTitle = styled(Typography)(({ theme, completed }) => ({
  textDecoration: completed ? "line-through" : "none",
  color: completed ? theme.palette.text.disabled : theme.palette.text.primary,
  flexGrow: 1,
  marginRight: theme.spacing(2),
}));

const ButtonGroup = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // gap: theme.spacing(1),
}));

const getPriorityDetails = (priority) => {
  let color;
  let label;
  if (priority === 3) {
    color = "red";
    label = "High";
  } else if (priority === 2) {
    color = "orange";
    label = "Medium";
  } else {
    color = "green";
    label = "Low";
  }
  return { color, label };
};

const PriorityIndicator = styled(Box)(({ color }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  color: color,
  fontWeight: "bold",
}));

const DeadlineIndicator = styled(Box)(({ missed }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  color: missed ? "red" : "inherit",
}));

const TodoItem = ({ todoItem }) => {
  const dispatch = useDispatch();
  const { title, description, deadline, completed, priority } = todoItem;

  const now = new Date();
  const deadlineDate = new Date(deadline);
  const missedDeadline = deadlineDate < now;
  const { color, label } = getPriorityDetails(priority);

  const handleMarkAsComplete = () => {
    dispatch(markAsComplete(todoItem));
    toast.success("Marked as completed");
  };

  const handleDelete = () => {
    dispatch(deleteNote(todoItem));
    toast.success("Deleted");
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <TodoTitle variant="subtitle1" completed={completed}>
          {title}
        </TodoTitle>
        <PriorityIndicator color={color}>
          <PriorityHighIcon />
        </PriorityIndicator>
        <ButtonGroup>
          <EditNote note={todoItem} />
          <IconButton onClick={handleDelete} color="secondary">
            <DeleteIcon style={{ color: "#67339e" }} />
          </IconButton>
          {!completed && (
            <IconButton onClick={handleMarkAsComplete} color="success">
              <CheckCircleIcon
                style={{
                  color: "#67339e",
                }}
              />
            </IconButton>
          )}
        </ButtonGroup>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2">{description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <DeadlineIndicator missed={missedDeadline}>
              <EventIcon />
              <Typography variant="caption">
                {missedDeadline ? "Missed Deadline! " : "Deadline: "}
                {deadlineDate.toLocaleDateString()}
              </Typography>
            </DeadlineIndicator>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default TodoItem;
