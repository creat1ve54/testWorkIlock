import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { todoAPI } from "../../api/axios";
import { ITodo } from "../../type";

export const getTodoThunk = createAsyncThunk(
  "todos/getTodoThunk",
  async (id: string) => {
    const todoData = (await todoAPI.getTodo(id)).data;
    return todoData;
  },
);

export const putTodoThunk = createAsyncThunk(
  "todos/putTodoThunk",
  async ({ id, updateTodo }: { id: string; updateTodo: Partial<ITodo> }) => {
    const todoData = (await todoAPI.putTodo(id, updateTodo)).data;
    return todoData;
  },
);

export const deleteTodoThunk = createAsyncThunk(
  "todos/deleteTodoThunk",
  async (id: string) => {
    const todoData = (await todoAPI.delteTodo(id)).data;
    return todoData;
  },
);

export interface ITodoInitial {
  todo: ITodo | null;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: ITodoInitial = {
  todo: null,
  isLoading: false,
  error: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodoThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTodoThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTodoThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.todo = action.payload;
    });

    builder.addCase(putTodoThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(putTodoThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(putTodoThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.todo = action.payload;
    });

    builder.addCase(deleteTodoThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTodoThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.todo = action.payload;
    });
  },
});

// export const {} = todoSlice.actions;

export default todoSlice.reducer;
