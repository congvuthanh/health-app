import React from 'react';

// Data
import { footerNavItems } from 'data/footerMenuItems';

// Styled Components
import { FooterContainer, FooterNav, FooterNavItem } from './index.styles';

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterNav aria-label="Footer navigation">
        {footerNavItems.map((item) => (
          <FooterNavItem key={item.id} to={item.href}>
            {item.label}
          </FooterNavItem>
        ))}
      </FooterNav>
    </FooterContainer>
  );
};

export default Footer;
