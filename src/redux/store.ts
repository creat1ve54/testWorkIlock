import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./todos/todosSlice";

export const store = configureStore({
  reducer: {
    postsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
