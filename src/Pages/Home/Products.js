import { Grid } from '@mantine/core';
import React from 'react';
import ProductCard from '../../Shared/ProductCard/ProductCard';
import useProducts from '../../hooks/useProducts';

export const Products = () => {
  const [products] = useProducts();
  return (
    <div className="max-w-[1400px] flex flex-col items-center justify-center mx-5 px-0 md:px-20">
      <h1 className="text-center font-bold mb-20 text-2xl md:text-4xl">
        Our Latest Items
      </h1>
      <Grid grow>
        {products.slice(-6).map((product) => (
          <Grid.Col span={4} key={product._id}>
            <ProductCard {...product} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};
