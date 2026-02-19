import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todos/todosSlice";
import todoSlice from "./todo/todoSlice";

export const store = configureStore({
  reducer: {
    todosSlice,
    todoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
