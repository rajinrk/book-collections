import { createSlice } from '@reduxjs/toolkit';

interface user {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
}
interface authInterface {
  isLoading: boolean;
  successCode: string | null;
  errorCode: string | null;
  isAuthenticated: boolean;
  userData: user | null;
}
const initialState: authInterface = {
  isLoading: false,
  successCode: null,
  errorCode: null,
  isAuthenticated: false,
  userData: null,
};

const authSlice: any = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    resetauthStatusCode(state) {
      state.isLoading = false;
      state.successCode = null;
      state.errorCode = null;
    },

    loginRequest(state) {
      state.isLoading = true;
      state.successCode = null;
      state.errorCode = null;
    },

    loginSuccess(state, action) {
      state.isLoading = false;
      state.successCode = action.payload.status_code;
      state.userData = action.payload.data.user;
      state.isAuthenticated = true;
      localStorage.setItem(import.meta.env.TOKEN_NAME, action.payload.data.token);
      state.errorCode = null;
    },

    loginFailure(state, action) {
      state.isLoading = false;
      state.errorCode = action.payload.status_code;
      state.successCode = null;
    },

    registerRequest(state) {
      state.isLoading = true;
      state.successCode = null;
      state.errorCode = null;
    },

    registerSuccess(state, action) {
      state.isLoading = false;
      state.successCode = action.payload.status_code;
      state.errorCode = null;
    },

    registerFailure(state, action) {
      state.isLoading = false;
      state.errorCode = action.payload.status_code;
      state.successCode = null;
    },

    logout(state) {
      state.isLoading = false;
      state.successCode = null;
      state.errorCode = null;
      state.isAuthenticated = false;
      localStorage.removeItem('near-pay-token');
      localStorage.clear();
    },
  },
});
export const {
  resetauthStatusCode,
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
