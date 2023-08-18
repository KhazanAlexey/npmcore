import { createSlice } from '@reduxjs/toolkit';
import {getWpLayout, logOut, progressEnd, progressStart, removeAlert, removeSnack, setAlert, setLanguagePath, setSnack} from "../actions";
import {Alert, NoticeTypes, Snack, WpContent} from "../../models";


interface InitialCoreState {
  [NoticeTypes.Alerts]: Alert[];
  [NoticeTypes.Snacks]: Snack[];
  progress: string[] | null;
  languagePath: string;
  isLogout: boolean;
  wpContent: WpContent | null;
}

const initialState: InitialCoreState = {
  [NoticeTypes.Alerts]:  [],
  [NoticeTypes.Snacks]: [],
  progress: null,
  languagePath: '',
  isLogout: false,
  wpContent: null,
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(progressStart, (state, action) => {
        if (state.progress) state.progress.push(action.payload);
        else state.progress = [action.payload];
      })
      .addCase(progressEnd, (state, action) => {
        const ids = state.progress?.filter((id) => id !== action.payload);
        state.progress = ids?.length ? ids : null;
      })
      .addCase(setAlert.fulfilled, (state, action) => {
        action.payload && state.alerts.push(action.payload);
      })
      .addCase(removeAlert, (state, action) => {
        state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
      })
      .addCase(setSnack.fulfilled, (state, action) => {
        action.payload && state.snacks.push(action.payload);
      })
      .addCase(removeSnack, (state, action) => {
        state.snacks = state.snacks.filter((snack) => snack.id !== action.payload);
      })
      .addCase(setLanguagePath, (state, action) => {
        state.languagePath = action.payload;
      })
      .addCase(logOut, (state, action) =>  {
        state.isLogout = action.payload;
      })
      .addCase(getWpLayout.fulfilled, (state, action) => {
        state.wpContent = action.payload;
      });
  },
});
