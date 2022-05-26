import React from 'react';
import useFirebase from '../../hooks/useFireBase';
import { useQuery } from 'react-query';
import { Badge, Button, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';

const MyOrders = () => {
  const { user } = useFirebase();
  const {
    data: myOrders,
    isLoading,
    refetch,
  } = useQuery(['myorder', user.email], () =>
    fetch(`${process.env.REACT_APP_BASE_URL}/orders/?email=${user.email}`).then(
      (res) => res.json()
    )
  );

  return (
    <div>
      <h1>Your Orders</h1>
      {myOrders
        ?.slice(0)
        .reverse()
        .map((order) => (
          <OrderCard key={order._id} {...order} orderRefetch={refetch} />
        ))}
    </div>
  );
};

const OrderCard = (props) => {
  const navigate = useNavigate();
  const modals = useModals();

  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery(['myOrderedProducts', props._id], () =>
    fetch(`${process.env.REACT_APP_BASE_URL}/products/${props.productId}`).then(
      (res) => res.json()
    )
  );
  const handleCancel = () => {
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
      // console.log(props._id, product._id);
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/orders/${props._id}`
      );
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/products/${product._id}`,
        {
          quantity: parseInt(product.quantity) + parseInt(props.quantity),
        }
      );
      props.orderRefetch();
      showNotification({
        color: 'teal',
        title: 'Order Cancelled Successfully',
        message:
          'Your order has been cancelled by you. Proceed to product page to buy again',
      });
    };
  };

  return (
    <div class="transition-all max-w-5xl shadow-lg flex flex-col md:flex-row md:gap-6 items-center justify-between">
      <div className="w-64 m-auto md:mx-0 rounded-l-sm">
        <img class="m-4 object-contain" src={product?.image} alt="Room Image" />
      </div>
      <div class="w-full flex flex-col m-4 gap-2 px-4 md:px-0">
        <h3 class="text-xl my-2">{product?.name}</h3>
        <div class="text-sm flex items-center">{product?.description}</div>
        <h2>
          {'Ordered Quantity: '}
          <span class="text-xl font-bold text-orange-500">
            {props.quantity}
          </span>
          <span class="text-base"> Pieces</span>
        </h2>
        <h3>
          {'Order Placed On: '}
          {new Date(props.date).toUTCString()}
        </h3>
        <Group>
          <div className="flex gap-4 items-center">
            <h2>Order Status:</h2>
            <h2>Payment:</h2>
            {props.paymentStatus == '' ? (
              <Badge color="gray">Unpaid</Badge>
            ) : (
              <Badge color="orange">Paid</Badge>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <h2>Delivery:</h2>
            {props.deliveryStatus == '' ? (
              <Badge color="gray">Processing</Badge>
            ) : (
              <Badge color="green">Shipped</Badge>
            )}
          </div>
        </Group>
        {!props.paymentStatus && (
          <div className="flex gap-2">
            <Button
              className="m-auto md:m-0"
              variant="gradient"
              gradient={{ from: 'yellow', to: 'orange' }}
              style={{ marginTop: 8, maxWidth: '100px' }}
              onClick={() => {
                navigate(`/checkout/${product._id}`);
              }}
            >
              Pay Now
            </Button>
            <Button
              className="m-auto md:m-0"
              variant="filled"
              color="red"
              style={{ marginTop: 8, maxWidth: '140px' }}
              onClick={() => {
                handleCancel();
              }}
            >
              Cancel Order
            </Button>
          </div>
        )}
        {props.paymentStatus && (
          <Button
            className="m-auto md:m-0"
            variant="gradient"
            gradient={{ from: 'lime', to: 'cyan' }}
            style={{ marginTop: 8, maxWidth: '120px' }}
            onClick={() => {
              navigate(`/purchase/${product._id}`);
            }}
          >
            Buy Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
