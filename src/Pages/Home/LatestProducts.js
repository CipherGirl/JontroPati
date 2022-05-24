import { Grid, Loader } from '@mantine/core';
import React, { useEffect } from 'react';
import ProductCard from '../../Shared/ProductCard/ProductCard';
import { useQuery } from 'react-query';
import axios from 'axios';

export const LatestProducts = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery('latstProducts', async () => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/products`);
  });

  if (isLoading) {
    return (
      <Loader className="m-auto" color="orange" size="xl" variant="dots" />
    );
  }
  return (
    <div className="max-w-[1400px] flex flex-col items-center justify-center mx-5 px-0 md:px-20">
      <h1 className="text-center font-bold mb-32 text-2xl md:text-4xl mt-0 md:mt-10 ">
        Our Latest Products
      </h1>
      <Grid grow>
        {products?.data.slice(-6).map((product) => (
          <Grid.Col span={4} key={product._id}>
            <ProductCard {...product} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};
