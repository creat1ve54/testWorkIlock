import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { todoAPI, todosAPI } from "../../api/axios";
import { ITodo } from "../../type";
import { deleteTodoThunk, putTodoThunk } from "../todo/todoSlice";

export const todosThunk = createAsyncThunk("todos/getTodosThunk", async () => {
  const todosData = (await todosAPI.getTodos()).data;
  return todosData;
});

export const getSearchTodos = createAsyncThunk("todos/getSearchTodos", async (q: string) => {
  const todosData = (await todosAPI.getSearchTodos(q)).data;
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

    builder.addCase(getSearchTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getSearchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getSearchTodos.fulfilled, (state, action) => {
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

    builder.addCase(deleteTodoThunk.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
      state.error = "";
      state.todos = state.todos.filter((item) => item.id !== action.payload.id);
    });

    builder.addCase(putTodoThunk.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(putTodoThunk.fulfilled, (state, action) => {
      state.error = "";
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }

        return item;
      });
    });
  },
});


export default todosSlice.reducer;
