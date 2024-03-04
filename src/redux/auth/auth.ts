import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";

export interface AuthState {
  address: string;
  role: string;
  nftId: number | null;
  currentMenu: string;
  loading: boolean;
  hidden: boolean;
  change: boolean;
  status: "idle" | "loading" | "failed";
  locale: string;
  darkMode: boolean;
}

const initialState: AuthState = {
  address: "",
  nftId: null,
  role: "",
  currentMenu: "",
  loading: false,
  hidden: true,
  status: "loading",
  change: false,
  locale: "en",
  darkMode: false,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    darkModeTogle: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    toggleLocale(state, { payload }) {
      payload = payload || state.locale;
      localStorage.setItem("i18nextLng", payload);
      state.locale = payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setHidden: (state, action: PayloadAction<boolean>) => {
      state.hidden = action.payload;
    },
    setChange: (state, action: PayloadAction<boolean>) => {
      state.change = action.payload;
    },

    setClear: (state) => {
      state.address = "";
      state.role = "";
      state.loading = false;
      state.hidden = true;
      state.change = false;
    },
    setnftId: (state, action: PayloadAction<number>) => {
      state.nftId = action.payload;
    },  
    toggleMenu: (state, action: PayloadAction<string>) => {
      if (action.payload === state.currentMenu) {
        state.currentMenu = "";
        localStorage.setItem("currentMenu",action.payload);
      }else {
        state.currentMenu = action.payload;
        localStorage.setItem("currentMenu", action.payload);
      }
    }

  },
});

export const {
  setAddress,
  setRole,
  setLoading,
  setHidden,
  setChange,
  setClear,
  setnftId,
  toggleLocale,
  toggleMenu,
  darkModeTogle
} = AuthSlice.actions;

export const selectData = (state: RootState) => ({
  address: state.Auth.address,
  role: state.Auth.role,
  nftId: state.Auth.nftId,
  loading: state.Auth.loading,
  hidden: state.Auth.hidden,
  change: state.Auth.change,
  locale: state.Auth.locale,
  currentMenu: state.Auth.currentMenu,
  darkMode: state.Auth.darkMode,
});

export default AuthSlice.reducer;
