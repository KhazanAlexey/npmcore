import { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalPortalProps {
  children: JSX.Element;
  isUsePortal?: boolean;
  isOpen: boolean;
}

export const ModalPortal = (props: ModalPortalProps) => {
  const { isUsePortal = true, isOpen, children } = props;

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';

    return () => {
      if (isOpen) document.body.style.overflow = 'initial';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return isUsePortal
    ? ReactDOM.createPortal(children, document.getElementById('app-modal') as HTMLElement)
    : children;
};
