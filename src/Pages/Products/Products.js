import { Button, Grid, MediaQuery, ScrollArea, Table } from '@mantine/core';
import React from 'react';
import ProductCard from '../../Shared/ProductCard/ProductCard';
import useProducts from '../../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

export const Products = () => {
  const [products] = useProducts();
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col items-center justify-center mx-0 px-0 md:mx-20 md:px-20">
      <h1 className="text-xl md:text-2xl my-10">Our Collection</h1>

      <MediaQuery
        query="(max-width: 767px) and (min-width: 300px)"
        styles={{ width: 350 }}
      >
        <ScrollArea>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Purchase Item</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>
                    {'$ '}
                    {product.price}
                  </td>
                  <td>{product.quantity}</td>
                  <td>
                    <img className="max-w-[30px] h-auto" src={product.image} />
                  </td>
                  <td>
                    <Button
                      variant="outline"
                      color="green"
                      onClick={() => navigate(`/purchase/${product._id}`)}
                    >
                      Buy Now
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      </MediaQuery>
    </div>
  );
};
