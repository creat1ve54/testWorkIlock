import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { todoAPI, todosAPI } from "../../api/axios";
import { IPagination, ITodo } from "../../type";
import { deleteTodoThunk, putTodoThunk } from "../todo/todoSlice";

export const todosThunk = createAsyncThunk(
  "todos/getTodosThunk",
  async ({ page = 1, limit = 15 }: { page?: number; limit?: number }) => {
    const todosData = await todosAPI.getTodos(page, limit);

    const totalCount = parseInt(todosData.headers["x-total-count"] || "0", 10);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: todosData.data,
      paginations: {
        totalCount,
        currentPage: page,
        totalPages,
        limit,
      },
    };
  },
);

export const getSearchTodos = createAsyncThunk(
  "todos/getSearchTodos",
  async ({
    q,
    page = 1,
    limit = 15,
  }: {
    q: string;
    page?: number;
    limit?: number;
  }) => {
    const todosData = await todosAPI.getSearchTodos(q, page, limit);

    const totalCount = parseInt(todosData.headers["x-total-count"] || "0", 10);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: todosData.data,
      paginations: {
        totalCount,
        currentPage: page,
        totalPages,
        limit,
      },
    };
  },
);

export const postTodoThunk = createAsyncThunk(
  "todos/postTodoThunk",
  async (todo: Partial<ITodo>) => {
    const todoData = (await todoAPI.postTodo(todo)).data;
    return todoData;
  },
);

interface ITodosInitial {
  todos: ITodo[];
  paginations: IPagination;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: ITodosInitial = {
  todos: [],
  paginations: {
    currentPage: 1,
    limit: 15,
    totalCount: 0,
    totalPages: 0,
  },
  isLoading: false,
  error: "",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    updatePaginationAfterDelete: (
      state,
      action: { payload: { deletedId: string } },
    ) => {
      const { deletedId } = action.payload;

      state.todos = state.todos.filter((item) => item.id !== deletedId);

      state.paginations.totalCount -= 1;
      state.paginations.totalPages = Math.ceil(
        state.paginations.totalCount / state.paginations.limit,
      );

      if (state.todos.length === 0 && state.paginations.currentPage > 1) {
        state.paginations.currentPage -= 1;
      }
    },
  },
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
      // state.todos = action.payload;
      state.todos = action.payload.data;
      state.paginations = action.payload.paginations;
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
      // state.todos = action.payload;
      state.todos = action.payload.data;
      state.paginations = action.payload.paginations;
    });

    // builder.addCase(postTodoThunk.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    
    builder.addCase(postTodoThunk.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(postTodoThunk.fulfilled, (state, action) => {
      state.error = "";
      state.todos.push(action.payload);
    });

    builder.addCase(deleteTodoThunk.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
      const deletedId = action.payload.id;
      state.todos = state.todos.filter((item) => item.id !== deletedId);
      state.error = "";
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
