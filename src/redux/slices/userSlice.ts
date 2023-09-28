import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  name?: string;
  pass?: string;
  country?: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: {},
    isLogin: false,
    notUser: false,
    isRegister: false,
  } as {
    users: IUser[];
    user: IUser;
    isLogin: boolean;
    notUser: boolean;
    isRegister: boolean;
  },
  reducers: {
    addUser(state, action: { payload: IUser }) {
      const isRegister = state.users.some(
        (user) => user.name === action.payload.name
      );
      if (!isRegister) {
        state.users = [...state.users, action.payload];
        state.user = action.payload;
        state.isLogin = true
      } else {
        state.isRegister = true;
      }
    },
    logIn(state, action: { payload: IUser }) {
      const isLogin = state.users.find(
        (user) =>
          user.name === action.payload.name && user.pass === action.payload.pass
      );

      if (typeof isLogin !== "undefined") {
        state.isLogin = true;
        state.user = state.users.find(
          (user) => user.name === action.payload.name
        ) as IUser;
      } else {
        state.isLogin = false;
        state.notUser = true;
      }
    },
    retryLogin(state) {
      state.notUser = false;
    },
    retrySignUp(state) {
      state.isRegister = false;
    },
    logOut(state) {
      state.isLogin = false;
      state.isRegister = false;
      state.notUser = false;
      state.user = {};
    },
  },
});

const { actions, reducer } = userSlice;

export default userSlice.reducer;
export const { addUser, logOut, logIn, retryLogin, retrySignUp } = actions;
