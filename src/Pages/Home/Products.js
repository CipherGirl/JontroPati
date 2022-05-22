import { Grid } from '@mantine/core';
import React from 'react';
import ProductCard from '../../Shared/ProductCard/ProductCard';

export const Products = () => {
  const sixItems = [1, 2, 3, 4, 5, 6];
  return (
    <div className="max-w-[1400px] flex flex-col items-center justify-center mx-5 px-0 md:px-20">
      <h1 className="text-center font-bold mb-20 text-2xl md:text-4xl">
        Our Latest Items
      </h1>
      <Grid grow>
        {sixItems.map((item) => (
          <Grid.Col span={4} key={item}>
            <ProductCard />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};
