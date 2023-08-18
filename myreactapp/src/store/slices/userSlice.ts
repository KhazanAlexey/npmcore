import { createSlice } from '@reduxjs/toolkit';

import { User } from 'src/models';

interface InitialUserState {
  user: User | null;
}

const initialState: InitialUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: () => {},
});
