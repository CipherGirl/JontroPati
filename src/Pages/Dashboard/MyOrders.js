import React from 'react';
import useFirebase from '../../hooks/useFireBase';
import { useQuery } from 'react-query';
import { Badge, Button, Group } from '@mantine/core';

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

  console.log(myOrders);
  return (
    <div>
      <h1>Your Orders</h1>
      {myOrders?.map((order) => (
        <OrderCard key={order._id} {...order} />
      ))}
    </div>
  );
};

const OrderCard = (props) => {
  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery(['myOrderedProducts', props._id], () =>
    fetch(`${process.env.REACT_APP_BASE_URL}/products/${props.productId}`).then(
      (res) => res.json()
    )
  );
  console.log('Product', product);

  return (
    <div class="transition-all max-w-5xl shadow-lg flex flex-col md:flex-row md:gap-6 items-center justify-between">
      <div className="w-64 m-auto md:mx-0 rounded-l-sm">
        <img class="m-4 object-contain" src={product?.image} alt="Room Image" />
      </div>
      <div class="w-full flex flex-col m-4 gap-4 px-4 md:px-0">
        <h3 class="text-xl my-2">{product?.name}</h3>
        <div class="text-sm flex items-center">{product?.description}</div>
        <h2>
          {'Ordered Quantity: '}
          <span class="text-xl font-bold text-orange-500">
            {props.quantity}
          </span>
          <span class="text-base"> Pieces</span>
        </h2>
        <Group>
          <div className="flex gap-4 items-center">
            <h2>Payment Status</h2>{' '}
            {props.paymentStatus == '' ? (
              <Badge color="gray">Unpaid</Badge>
            ) : (
              <Badge color="orange">Paid</Badge>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <h2>Delivery Status</h2>{' '}
            {props.deliveryStatus == '' ? (
              <Badge color="gray">Processing</Badge>
            ) : (
              <Badge color="green">Shipped</Badge>
            )}
          </div>
        </Group>
        <Button
          className="m-auto md:m-0"
          variant="gradient"
          gradient={{ from: 'yellow', to: 'orange' }}
          style={{ marginTop: 8, maxWidth: '100px' }}
          onClick={() => {}}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default MyOrders;
