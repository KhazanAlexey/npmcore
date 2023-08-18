import { LanguageSwitcherProps, LanguageSwitcher } from './LanguageSwitcher';
import { useActions } from '@/core/hooks';
import { setLanguagePath } from '@/core/store/actions';

type LanguageSwitcherContainerProps = Omit<
  LanguageSwitcherProps,
  'languagePath' | 'setLanguagePath'
>;

export const LanguageSwitcherContainer = (props: LanguageSwitcherContainerProps) => {
  const actions = useActions({ setLanguagePath });

  return <LanguageSwitcher {...props} {...actions} />;
};
