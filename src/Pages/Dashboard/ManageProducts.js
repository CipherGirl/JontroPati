import {
  Button,
  Loader,
  MediaQuery,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const ManageProducts = () => {
  const modals = useModals();
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
  const handleDelte = (id) => {
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteProduct(),
    });

    const deleteProduct = async () => {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/products/${id}`);
      refetch();
      showNotification({
        color: 'teal',
        title: 'Product Deleted Successfully',
        message: 'The product has been removed from Database',
      });
    };
  };

  if (isLoading) {
    return (
      <Loader className="m-auto" color="orange" size="xl" variant="dots" />
    );
  }

  return (
    <div className=" min-h-[calc(100vh-64px)] ">
      <h1 className="text-xl md:text-2xl my-10">Manage All Products</h1>

      <MediaQuery
        query="(max-width: 767px) and (min-width: 300px)"
        styles={{ width: 350 }}
      >
        <ScrollArea>
          <Table style={{ width: 1000 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Minimum Order</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Delete Item</th>
              </tr>
            </thead>
            <tbody>
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
                      color="red"
                      onClick={() => {
                        handleDelte(product._id);
                      }}
                    >
                      Delete Item
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

export default ManageProducts;
