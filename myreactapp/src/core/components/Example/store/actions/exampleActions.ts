import { createAsyncThunk } from '@reduxjs/toolkit';

import { $axios } from '@/core/services';
import { UserExample } from '@/core/components/Example/models';
import { DispatchedAction } from '@/core/models';

export const fetchUsersInfo = createAsyncThunk<UserExample[]>(
  'FETCH_USERS',
  async (_, { rejectWithValue, dispatch }) => {
    const config = {
      method: 'GET',
      url: '/users',
    };

    try {
      return await $axios(config, dispatch);
    } catch (errors) {
      return rejectWithValue(errors);
    }
  },
);

export type FetchUsersInfo = DispatchedAction<typeof fetchUsersInfo>;
