import React, { useEffect } from 'react';
import useFirebase from '../../hooks/useFireBase';
import { useQuery } from 'react-query';
import { Badge, Button, Group, Loader, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import { auth } from '../../firebase.init';
import { signOut } from 'firebase/auth';

const MyOrders = () => {
  const { user } = useFirebase();
  const navigate = useNavigate();
  const { handleSignout } = useFirebase();

  const {
    data: myOrders,
    isLoading,
    refetch,
    status,
    isIdle,
  } = useQuery(['myOrders', user?.email, 'random'], () => fetchOrders(), {
    enabled: !!user.email,
  });

  const fetchOrders = async () => {
    const request = await fetch(
      `${process.env.REACT_APP_BASE_URL}/myorders/?email=${user.email}`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return await request.json();
  };

  if (
    myOrders?.message == 'Unauthorized' ||
    myOrders?.message == 'Forbidden Access'
  ) {
    signOut(auth);
    localStorage.removeItem('accessToken');
    navigate('/');
  }
  if (isLoading) {
    return (
      <Loader className="m-auto" color="orange" size="xl" variant="dots" />
    );
  }

  return (
    <div>
      <h1>Your Orders</h1>
      {myOrders?.length == 0 && (
        <h2 className="my-10 text-2xl">You Don't Have Placed Any Orders</h2>
      )}
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
  useEffect(() => {
    console.log(props);
  });
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
        <h3 class="text-xl font-semibold my-2">{product?.name}</h3>
        <div class="text-sm flex items-center">{product?.description}</div>
        <h2 className="text-sm font-medium">
          {'Quantity Ordered: '}
          <span class="text-xl font-bold text-orange-500">
            {props.quantity}
          </span>
          <span class="text-base"> Pieces</span>
        </h2>
        <h2 className="text-sm font-medium">
          {'Date: '}
          {new Date(props.date).toLocaleString()}
        </h2>
        <div className="flex flex-col md:flex-row py-2  gap-4 items-start md:items-center">
          <h2 className="text-sm font-medium">Status:</h2>
          <div className="flex gap-2">
            <h2 className="text-sm font-medium">Payment:</h2>
            {props.paymentStatus == '' ? (
              <Badge color="gray">Unpaid</Badge>
            ) : (
              <Badge color="orange">Paid</Badge>
            )}
          </div>
          {props.paymentStatus && (
            <div className="flex gap-2">
              <h2 className="text-sm font-medium">TransactionId:</h2>
              <Badge color="cyan">{props.transactionId}</Badge>
            </div>
          )}
          <div className="flex gap-2">
            <h2 className="text-sm font-medium">Delivery:</h2>
            {props.deliveryStatus == '' ? (
              <Badge color="gray">Processing</Badge>
            ) : (
              <Badge color="green">Shipped</Badge>
            )}
          </div>
        </div>
        {!props.paymentStatus && (
          <div className="flex gap-2">
            <Button
              className="m-auto md:m-0"
              variant="gradient"
              gradient={{ from: 'yellow', to: 'orange' }}
              style={{ marginTop: 8, maxWidth: '100px' }}
              onClick={() => {
                navigate(`/checkout/${props._id}`);
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
            gradient={{ from: 'green', to: 'cyan' }}
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
