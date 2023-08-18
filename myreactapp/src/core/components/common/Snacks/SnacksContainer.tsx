import { SnacksProps, Snacks } from '@/core/components/common';
import { useActions, useTypedSelector } from '@/core/hooks';
import { removeSnack } from '@/core/store/actions';
import { getSnacksSelector } from '@/core/store/selectors';

interface SnacksContainerProps extends Omit<SnacksProps, 'removeSnack' | 'snacks'> {}

export const SnacksContainer = (props: SnacksContainerProps) => {
  const actions = useActions({ removeSnack });

  const snacks = useTypedSelector(getSnacksSelector);

  return <Snacks snacks={snacks} {...actions} {...props} />;
};
