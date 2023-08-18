import { CoreState } from '@/core/store';

export const getAlertsSelector = (state: CoreState) => state.coreReducer.alerts;
export const getSnacksSelector = (state: CoreState) => state.coreReducer.snacks;
export const getProgressSelector = (state: CoreState) => state.coreReducer.progress;
export const getLanguagePathSelector = (state: CoreState) => state.coreReducer.languagePath;
