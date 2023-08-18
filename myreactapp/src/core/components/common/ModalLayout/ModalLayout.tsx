import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { TriggerElement } from './TriggerElement';
import { ModalPortal } from './ModalPortal';
import {CloseIcon} from "@/core/components/common";

export interface ModalLayoutProps {
  Header?: FC<{ onClose: () => void }>;
  Content?: FC;
  Footer?: FC<{ onClose: () => void }>;
  title?: JSX.Element | string;
  content?: JSX.Element | string;
  footer?: JSX.Element | string;
  children?: JSX.Element | null;
  animationDuration?: number;
  isOutSideClick?: boolean;
  isShowClose?: boolean;
  isOpenModal?: boolean;
  isUsePortal?: boolean;
  classes?: {
    root?: string;
    wrapper?: string;
    header?: string;
    title?: string;
    close?: string;
    content?: string;
    footer?: string;
  };
  onClick?: () => void;
  onClose?: () => void;
}

export const ModalLayout = (props: ModalLayoutProps) => {
  const {
    Header,
    Content,
    Footer,
    content,
    footer,
    title,
    children = null,
    classes = {},
    isOutSideClick = false,
    isShowClose = true,
    isOpenModal = false,
    isUsePortal,
    animationDuration = 300,
    onClose,
    onClick,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    isOpenModal ? setIsOpen(isOpenModal) : handelClose();
  }, [isOpenModal]);

  const handelClickChildren = () => {
    setIsOpen(true);
    onClick && onClick();
  };

  const handelClose = () => {
    if (!isOpen) return;

    modalRef.current?.classList.add('modal-core__closing');

    setTimeout(() => {
      setIsOpen(false);
      onClose && onClose();
    }, animationDuration - 50);
  };

  const handelCloseOutSide: MouseEventHandler<HTMLElement> = (e) => {
    if (!isOutSideClick || e.target !== e.currentTarget) return;
    handelClose();
  };

  return (
    <>
      <ModalPortal isUsePortal={isUsePortal} isOpen={isOpen}>
        <div
          className={cn('modal-core', isOpen && 'modal-core__open', classes.root)}
          onClick={handelCloseOutSide}
          ref={modalRef}
          style={{ animationDuration: `${animationDuration}ms` }}
        >
          <div
            className={cn('modal-core__wrapper', classes.wrapper)}
            style={{ animationDuration: `${animationDuration}ms` }}
          >
            {Header ? (
              <Header onClose={handelClose} />
            ) : (
              <div className={cn('modal-core__header', classes.header)}>
                <h1 className={cn('modal-core__title', classes.title)}>{title}</h1>
                {isShowClose && (
                  <span className={cn('modal-core__close', classes.close)} onClick={handelClose}>
                    <CloseIcon />
                  </span>
                )}
              </div>
            )}
            {Content ? (
              <Content />
            ) : (
              <div className={cn('modal-core__content', classes.content)}>{content}</div>
            )}
            {Footer ? (
              <Footer onClose={handelClose} />
            ) : (
              <div className={cn('modal-core__footer', classes.footer)}>{footer}</div>
            )}
          </div>
        </div>
      </ModalPortal>
      {children ? <TriggerElement onClick={handelClickChildren}>{children}</TriggerElement> : null}
    </>
  );
};
