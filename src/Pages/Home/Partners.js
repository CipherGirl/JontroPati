import React from 'react';

const Partners = () => {
  return (
    <div className="max-w-[1400px] flex flex-col items-center justify-center mx-5 px-0 md:px-20">
      <h1>Our Partners</h1>
      <div className="flex max-w-5xl items-center justify-center flex-wrap gap-4 py-10">
        <img
          className="max-h-36"
          src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Macdonald_Realty_Logo.png"
        ></img>
        <img
          className="max-h-64"
          src="https://upload.wikimedia.org/wikipedia/commons/d/d6/FINDLAY_REAL_ESTATE_LOGO_DESIGN.png"
        ></img>
        <img
          className="max-h-52"
          src="https://upload.wikimedia.org/wikipedia/commons/7/73/Cosgrove.png"
        ></img>
        <img
          className="w-44 object-contain"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/EgyptAir_Maintenance_and_Engnieering_Co..png"
        ></img>
      </div>
    </div>
  );
};

export default Partners;
