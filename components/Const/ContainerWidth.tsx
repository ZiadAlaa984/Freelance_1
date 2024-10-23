import React from 'react';

interface ContainerWidthProps {
  children: React.ReactNode;
}

const ContainerWidth: React.FC<ContainerWidthProps> = ({ children }) => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="container mx-auto   px-6 py-4   ">
        {children}
      </div>
    </div>
  );
};

export default ContainerWidth;
