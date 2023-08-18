import { createSlice } from '@reduxjs/toolkit';

import { fetchUsersInfo } from '@/core/components/Example/store/actions';
import { UserExample } from '@/core/components/Example/models';

interface IInitialState {
  users: null | UserExample[];
}

const initialState: IInitialState = {
  users: null,
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersInfo.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});
