import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../type";
import { usersAPI } from "../../api/axios";

export const usersThunk = createAsyncThunk("users/getSsersThunk", async () => {
  const usersData = (await usersAPI.getUsers()).data;
  return usersData;
});

interface IUsersInitial {
  users: IUser[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IUsersInitial = {
  users: [],
  isLoading: false,
  error: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(usersThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(usersThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(usersThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
