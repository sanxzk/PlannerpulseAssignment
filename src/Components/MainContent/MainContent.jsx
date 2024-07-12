import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Tabs,
  Tab,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import TodoItem from "../../Components/TodoItem/TodoItem";

const MainContent = () => {
  const { notesList } = useSelector((state) => state.todo);
  const completedNotes = notesList.filter((note) => note.completed === true);
  const inProgressNotes = notesList.filter((note) => {
    const nowDate = new Date();
    return new Date(note.deadline) > nowDate && !note.completed;
  });
  const missedDeadlines = notesList.filter((note) => {
    const nowDate = new Date();
    return new Date(note.deadline) < nowDate && !note.completed;
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      {isMobile ? (
        <Box sx={{ overflowY: 'hidden' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="Notes tabs"
            variant="fullWidth"
          >
            <Tab label="Completed" />
            <Tab label="In Progress" />
            <Tab label="Missed Deadlines" />
          </Tabs>
          <TabPanel value={activeTab} index={0}>
            {completedNotes.map((note) => (
              <TodoItem key={note.id} todoItem={note} />
            ))}
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            {inProgressNotes.map((note) => (
              <TodoItem key={note.id} todoItem={note} />
            ))}
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            {missedDeadlines.map((note) => (
              <TodoItem key={note.id} todoItem={note} />
            ))}
          </TabPanel>
        </Box>
      ) : (
        <Grid container spacing={2} style={{ margin: "0px 0", marginTop: "0rem", padding: "0" , width:'100%', overflowY: 'hidden' }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Completed
            </Typography>
            {completedNotes.map((note) => (
              <TodoItem key={note.id} todoItem={note} />
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              In Progress
            </Typography>
            {inProgressNotes.map((note) => (
              <TodoItem key={note.id} todoItem={note} />
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Missed Deadlines
            </Typography>
            {missedDeadlines.map((note) => (
              <TodoItem key={note.id} todoItem={note} />
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default MainContent;
