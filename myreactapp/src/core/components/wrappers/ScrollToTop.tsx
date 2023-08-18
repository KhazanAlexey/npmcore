import { PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps extends ScrollToOptions {}

export const ScrollToTop = (props: PropsWithChildren<ScrollToTopProps>) => {
  const { children, top = 0, left = 0, behavior = 'auto' } = props;

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top,
      left,
      behavior,
    });
  }, [location.pathname]);

  return children;
};
