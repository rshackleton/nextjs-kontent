import React, { Fragment } from 'react';

interface ILayoutProps {}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
