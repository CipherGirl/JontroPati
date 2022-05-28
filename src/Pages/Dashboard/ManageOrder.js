import {
  Badge,
  Button,
  Loader,
  MediaQuery,
  ScrollArea,
  Select,
  Table,
  Text,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const ManageOrders = () => {
  const modals = useModals();
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const {
    data: allOrders,
    isLoading,
    refetch,
  } = useQuery('allOrders', () =>
    fetch(`${process.env.REACT_APP_BASE_URL}/orders`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
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
      onConfirm: () => deleteOrder(),
    });

    const deleteOrder = async () => {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/orders/${id}`);
      refetch();
      showNotification({
        color: 'teal',
        title: 'Product Deleted Successfully',
        message: 'The product has been removed from Database',
      });
    };
  };

  useEffect(() => {
    console.log(allOrders);
  }, [allOrders]);

  const shipOrder = async (id, value) => {
    setValue('shipped');
    await axios.put(`${process.env.REACT_APP_BASE_URL}/orders/${id}`, {
      deliveryStatus: value,
    });
    refetch();
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
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Product Id</th>
                <th>Quantity</th>
                <th>Payment</th>
                <th>TransactionId</th>
                <th>Delivery</th>
                <th>Deliver?</th>
                <th>Delete Order</th>
              </tr>
            </thead>
            <tbody>
              {allOrders?.map((order) => (
                <tr key={order._id}>
                  <td className="text-left font-semibold text-orange-500">
                    {order.name}
                  </td>
                  <td>{order.phone}</td>
                  <td
                    onClick={() => navigate(`/purchase/${order.productId}`)}
                    className="text-blue-400 cursor-pointer"
                  >
                    {order.productId}
                  </td>
                  <td>{order.quantity}</td>

                  <td>
                    {order.paymentStatus == '' ? (
                      <Badge color="gray">Unpaid</Badge>
                    ) : (
                      <Badge color="orange">Paid</Badge>
                    )}
                  </td>
                  <td>
                    {order.transactionId == '' ? (
                      <Badge color="gray">Processing</Badge>
                    ) : (
                      <Badge color="cyan">{order.transactionId}</Badge>
                    )}
                  </td>
                  <td>
                    {order.deliveryStatus == '' ? (
                      <Badge color="gray">Processing</Badge>
                    ) : (
                      <Badge color="green">Shipped</Badge>
                    )}
                  </td>
                  <td>
                    <Select
                      style={{ width: 120 }}
                      disabled={order.paymentStatus === '' ? true : false}
                      onChange={(value) => shipOrder(order._id, value)}
                      data={[
                        { value: 'shipped', label: 'Shipped' },
                        { value: '', label: 'Processing' },
                      ]}
                    />
                  </td>

                  <td>
                    <Button
                      color="red"
                      disabled={
                        order.deliveryStatus === 'shipped' ? true : false
                      }
                      onClick={() => {
                        handleDelte(order._id);
                      }}
                    >
                      Delete Order
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

export default ManageOrders;
