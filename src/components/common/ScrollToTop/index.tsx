import hoverIcon from 'assets/icons/ic-component-scroll-hover.svg';
import normalIcon from 'assets/icons/ic-component-scroll.svg';
import React from 'react';
import { HoverIcon, NormalIcon, ScrollButton } from './index.styles';

export const ScrollToTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ScrollButton
      onClick={scrollToTop}
      aria-label="ページのトップへ戻る"
      type="button"
    >
      <NormalIcon src={normalIcon} alt="default" />
      <HoverIcon src={hoverIcon} alt="hover" />
    </ScrollButton>
  );
};
