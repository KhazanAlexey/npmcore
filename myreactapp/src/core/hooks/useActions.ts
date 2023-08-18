import { useMemo } from 'react';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { DispatchedAction } from '../models';


type UseActionsReturn<M extends ActionCreatorsMapObject> = {
  [K in keyof M]: DispatchedAction<M[K]>;
};

export const useActions = <M extends ActionCreatorsMapObject>(actions: M): UseActionsReturn<M> => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);
};
