import { StateFromReducersMapObject } from '@reduxjs/toolkit';

import { coreSlice } from '@/core/store/slices';

const rootReducer = {
  coreReducer: coreSlice.reducer,
};

export type CoreState = StateFromReducersMapObject<typeof rootReducer>;
