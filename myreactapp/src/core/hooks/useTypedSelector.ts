import { shallowEqual, TypedUseSelectorHook, useSelector } from 'react-redux';

import { CoreState } from 'core/store';

export const useTypedSelector: TypedUseSelectorHook<CoreState> = <T>(
  selector: (state: CoreState) => T,
) => useSelector<CoreState, T>(selector, shallowEqual);
