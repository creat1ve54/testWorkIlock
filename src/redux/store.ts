import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todos/todosSlice";
import todoSlice from "./todo/todoSlice";
import usersSlice from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    todosSlice,
    todoSlice,
    usersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
