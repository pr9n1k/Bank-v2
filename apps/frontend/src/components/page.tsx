import React from 'react';
import Navbar from './Navbar';
interface PageProps {
  title?: string;
}
const Page: React.FC<React.PropsWithChildren<PageProps>> = ({
  children,
  title,
}) => {
  return (
    <div className="body">
      <Navbar />
      <div className="main">
        {title && <h1 className="h1 title">{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default Page;
