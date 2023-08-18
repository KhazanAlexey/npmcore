import { useEffect } from 'react';

import { ExampleAppLayout } from './ExampleAppLayout';
import {useActions} from "../../../../hooks";
import { getWpLayout } from '@/core/store/actions/coreActions';

export const ExampleAppLayoutContainer = () => {
  const actions = useActions({ getWpLayout });

  useEffect(() => {
    actions.getWpLayout();
  }, []);

  return <ExampleAppLayout />;
};
