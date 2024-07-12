import { createSlice } from "@reduxjs/toolkit";

if (!localStorage.getItem("notes")) {
  localStorage.setItem("notes", JSON.stringify([]));
}

const initialState = {
  notesList: JSON.parse(localStorage.getItem("notes")),
  isLoading: false,
  showAddModal: false,
  showEditModal: null,
  showDesc: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.showAddModal = true;
    },
    closeAddModal: (state) => {
      state.showAddModal = false;
    },
    openEditModal: (state, action) => {
      state.showEditModal = action.payload;
    },
    closeEditModal: (state) => {
      state.showEditModal = null;
    },
    openDescModal: (state, action) => {
      state.showDesc = action.payload;
    },
    closeDescModal: (state) => {
      state.showDesc = null;
    },
    dispatchAddNote: (state, action) => {
      state.notesList.push(action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notesList));
    },
    markAsComplete: (state, action) => {
      const id = action.payload.id;

      console.log(id, state.notesList);
      const index = state.notesList.findIndex((note) => note.id === id);
      if (index !== -1) {
        console.log(index);

        state.notesList[index].completed = true;
        // console.log(state.notesList[index]);
        localStorage.setItem("notes", JSON.stringify(state.notesList));
      } else {
        console.error(`Note with id ${id} not found in state.notesList.`);
      }
    },
    deleteNote: (state, action) => {
      const id = action.payload.id;
      state.notesList = state.notesList.filter((note) => note.id !== id);
      localStorage.setItem("notes", JSON.stringify(state.notesList));
    },
    updateNote: (state, action) => {
      const index = state.notesList.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notesList[index] = action.payload;
        localStorage.setItem("notes", JSON.stringify(state.notesList));
      }
    },
    sortByPriority: (state) => {
      let sortedList = [...state.taskList].sort(
        (a, b) => a.priority - b.priority
      );
      state.taskList = sortedList;
    },
    sortByDueDate: (state) => {
      let sortedList = [...state.taskList].sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA - dateB;
      });
      state.taskList = sortedList;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  openAddModal,
  closeAddModal,
  openEditModal,
  closeEditModal,
  openDescModal,
  closeDescModal,
  sortByPriority,
  sortByDueDate,
  dispatchAddNote,
  markAsComplete,
  updateNote,
  deleteNote
} = todoSlice.actions;
export default todoSlice.reducer;
