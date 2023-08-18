import { configureStore } from '@reduxjs/toolkit';
import {coreSlice} from "../core/store/slices";


export const store = configureStore({
  reducer: {
    coreReducer: coreSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
