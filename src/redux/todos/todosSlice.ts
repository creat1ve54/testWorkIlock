import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { todosAPI } from "../../api/axios";

//THUNK
export const todosThunk = createAsyncThunk("post/getTodosThunk", async () => {
  const todosData = (await todosAPI.getTodos()).data;
  return todosData;
});

export const todoThunk = createAsyncThunk(
  "todos/getTodoThunk",
  async (id: number) => {
    const todoData = (await todosAPI.getTodo(id)).data;
    return todoData;
  },
);

//TS
interface ITodos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  name?: string;
  photoSrc?: string;
}

interface ITodosInitial {
  todos: ITodos[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: ITodosInitial = {
  todos: [],
  isLoading: false,
  error: "",
};

export const todosSlice = createSlice({
  name: "posts",
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
  },
});

export const {} = todosSlice.actions;

export default todosSlice.reducer;
