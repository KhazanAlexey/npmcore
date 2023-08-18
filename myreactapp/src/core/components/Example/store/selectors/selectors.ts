import { CoreState } from '@/core/store';

type ExampleRootState = CoreState & any;

export const getUsersSelector = (state: ExampleRootState) => state.exampleReducer?.users;
