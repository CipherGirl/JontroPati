import React from 'react';

import { useLocation } from 'react-router-dom';

const NotFound = () => {
  let location = useLocation();
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
      <h1 className="mb-20 text-xl md:text-2xl text-center">
        404! No match for{' '}
        <span className="text-orange-500">{location.pathname}</span>
        <div className="flex items-center justify-center">
          <img width="100%" className="center" src="/404.png" alt="404" />
        </div>
      </h1>
    </div>
  );
};

export default NotFound;
