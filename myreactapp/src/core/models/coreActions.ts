import * as CoreActions from 'core/store/actions';
import { DispatchedAction } from './common';

export type SetAlert = DispatchedAction<typeof CoreActions.setAlert>;
export type SetSnack = DispatchedAction<typeof CoreActions.setSnack>;
export type RemoveAlert = DispatchedAction<typeof CoreActions.removeAlert>;
export type RemoveSnack = DispatchedAction<typeof CoreActions.removeSnack>;
export type SetLanguagePath = DispatchedAction<typeof CoreActions.setLanguagePath>;
export type ProgressStart = DispatchedAction<typeof CoreActions.progressStart>;
export type ProgressEnd = DispatchedAction<typeof CoreActions.progressEnd>;
export type LogOut = DispatchedAction<typeof CoreActions.logOut>;
export type GetWpLayout = DispatchedAction<typeof CoreActions.getWpLayout>;
