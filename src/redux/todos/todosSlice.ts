import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { todoAPI, todosAPI } from "../../api/axios";
import { ITodo } from "../../type";

//THUNK
export const todosThunk = createAsyncThunk("post/getTodosThunk", async () => {
  const todosData = (await todosAPI.getTodos()).data;
  return todosData;
});

export const postTodoThunk = createAsyncThunk(
  "todos/postTodoThunk",
  async (todo: Partial<ITodo>) => {
    const todoData = (await todoAPI.postTodo(todo)).data;
    return todoData;
  },
);


interface ITodosInitial {
  todos: ITodo[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: ITodosInitial = {
  todos: [],
  isLoading: false,
  error: "",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(todosThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(todosThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(todosThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.todos = action.payload;
    });

    builder.addCase(postTodoThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postTodoThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(postTodoThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.todos.push(action.payload);
    });
  },
});

export const {} = todosSlice.actions;

export default todosSlice.reducer;
