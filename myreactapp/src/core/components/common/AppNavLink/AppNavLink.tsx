import { NavLink, NavLinkProps } from 'react-router-dom';
import cn from 'classnames';

import { PlacementLangLocationType } from '@/core/models';

export interface AppNavLinkProps extends NavLinkProps {
  languagePath?: string;
  placementLangLocation?: PlacementLangLocationType;
  classes?: {
    root?: string;
  };
}

export const AppNavLink = (props: AppNavLinkProps) => {
  const {
    children,
    to,
    languagePath,
    classes = {},
    placementLangLocation = PlacementLangLocationType.Start,
    ...rest
  } = props;

  const toProps =
    placementLangLocation === PlacementLangLocationType.Start
      ? `${languagePath}${to === '/' ? '' : to}`
      : `${to === '/' ? '' : to}${languagePath}`;

  return (
    <NavLink end to={toProps} className={cn('app-link', classes.root)} {...rest}>
      {children}
    </NavLink>
  );
};
