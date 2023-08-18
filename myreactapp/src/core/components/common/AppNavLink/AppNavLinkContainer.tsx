import { AppNavLink, AppNavLinkProps } from './AppNavLink';
import { useTypedSelector } from '@/core/hooks';
import { getLanguagePathSelector } from '@/core/store/selectors';

interface AppNavLinkContainerProps extends AppNavLinkProps {}

export const AppNavLinkContainer = (props: AppNavLinkContainerProps) => {
  const languagePath = useTypedSelector(getLanguagePathSelector);

  return <AppNavLink {...props} languagePath={languagePath} />;
};
