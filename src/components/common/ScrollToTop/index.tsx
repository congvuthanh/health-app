import hoverIcon from 'assets/icons/ic-component-scroll-hover.svg';
import normalIcon from 'assets/icons/ic-component-scroll.svg';
import React, { useEffect, useMemo, useState } from 'react';
import { throttle } from 'utils/throttle';
import { HoverIcon, NormalIcon, ScrollButton } from './index.styles';

const SCROLL_THRESHOLD = 200; // 200px = 20rem
const THROTTLE_DELAY = 100; // 100ms throttle for scroll events

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Memoize the throttled scroll handler to prevent recreation on each render
  const throttledHandleScroll = useMemo(
    () =>
      throttle(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setIsVisible(scrollTop > SCROLL_THRESHOLD);
      }, THROTTLE_DELAY),
    []
  );

  useEffect(() => {
    // Check initial scroll position
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > SCROLL_THRESHOLD);

    // Add throttled scroll event listener
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll]);

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
      $isVisible={isVisible}
    >
      <NormalIcon src={normalIcon} alt="default" />
      <HoverIcon src={hoverIcon} alt="hover" />
    </ScrollButton>
  );
};
