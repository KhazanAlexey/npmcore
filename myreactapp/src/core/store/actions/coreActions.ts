import { createAction, createAsyncThunk, nanoid } from '@reduxjs/toolkit';


import {$axios} from "../../services";

import {SETTINGS} from "@/core/settings";
import {Alert, NoticeTypes, Snack } from '@/core/models/common';
import { CoreState } from '../store';
import {WpContent} from "@/core/models";

const getNoticePayload = (type: NoticeTypes, data: Omit<Snack | Alert, 'id'>, state: CoreState) => {
  const { isUniq = true, ...restData } = data;
  const { coreReducer } = state;

  const payload = { ...restData, id: nanoid() };

  if (!isUniq) return payload;

  const candidate = coreReducer[type].find((item) => item.message === data.message);

  return candidate ? null : payload;
};

export const setAlert = createAsyncThunk<Alert | null, Omit<Alert, 'id'>, { state: CoreState }>(
  'core/setAlert',
  (data, { getState }) => {
    const state = getState();
    return getNoticePayload(NoticeTypes.Alerts, data, state);
  },
);

export const setSnack = createAsyncThunk<Snack | null, Omit<Snack, 'id'>, { state: CoreState }>(
  'core/setSnack',
  (data, { getState }) => {
    const state = getState();
    return getNoticePayload(NoticeTypes.Snacks, data, state);
  },
);

export const removeAlert = createAction<string>('core/removeAlert');
export const removeSnack = createAction<string>('core/removeSnack');
export const progressStart = createAction<string>('core/progressStart');
export const progressEnd = createAction<string>('core/progressEnd');
export const setLanguagePath = createAction<string>('core/setLanguagePath');
export const logOut = createAction<boolean>('core/logOut');

export const getWpLayout = createAsyncThunk<WpContent, string | void>(
  'core/getWpLayout',
  async (lang, { rejectWithValue, dispatch }) => {
    const query = lang ? `?lang=${lang}` : '';

    const config = {
      method: 'GET',
      url: `${SETTINGS.apiService.apiPathWp}/wp-json/react/v2/data${query}`,
    };

    try {
      return await $axios(config, dispatch);
    } catch (errors) {
      return rejectWithValue(errors);
    }
  },
);
