import { Button, Loader, MediaQuery, ScrollArea, Table } from '@mantine/core';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const Products = () => {
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery('allProducts', () =>
    fetch(`${process.env.REACT_APP_BASE_URL}/products`).then((res) =>
      res.json()
    )
  );

  console.log(products, isLoading);

  if (isLoading) {
    return (
      <Loader className="m-auto" color="orange" size="xl" variant="dots" />
    );
  }

  return (
    <div className=" min-h-[calc(100vh-64px)] flex flex-col items-center justify-center pb-10">
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
                <th>Minimum Order</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Purchase Item</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {products?.map((product) => (
                <tr key={product._id}>
                  <td className="text-left font-semibold text-orange-500">
                    {product.name}
                  </td>
                  <td>
                    {'$ '}
                    {product.price}
                  </td>
                  <td>{product.minimumOrder}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <img className="max-w-[30px] h-auto" src={product.image} />
                  </td>
                  <td>
                    <Button
                      variant="outline"
                      color="cyan"
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
      <h5 className="mt-2 md:hidden text-slate-500">
        Scroll horizontally to see more
      </h5>
    </div>
  );
};
