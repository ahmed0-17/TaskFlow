import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  editingTodo: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        status: action.payload.status|| "Todo",
        dueDate: action.payload.dueDate,
        category: action.payload.category,
        createdAt: new Date().toISOString(),
      };

      state.todos.push(todo);
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
    },

    updateTodo: (state, action) => {
      const { id, title, description, priority,status, dueDate, category } =
        action.payload;

      const todo = state.todos.find((todo) => todo.id === id);

      if (todo) {
        todo.title = title;
        todo.description = description;
        todo.priority = priority;
        todo.status=status;
        todo.dueDate = dueDate;
        todo.category = category;

      }
    },

    setEditingTodo: (state, action) => {
      state.editingTodo = action.payload;
    },

    changeStatus: (state, action) => {
      const { id, status } = action.payload;

      const todo = state.todos.find((todo) => todo.id === id);

      if (todo) {
        todo.status = status;
      }
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  setEditingTodo,
  changeStatus,
} = todoSlice.actions;

export default todoSlice.reducer;