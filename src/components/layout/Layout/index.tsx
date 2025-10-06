import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Footer';
import Header from '../Header';
import { LayoutContainer, MainContent } from './index.styles';

export const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent role="main">
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
