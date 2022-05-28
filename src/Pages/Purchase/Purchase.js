import {
  Button,
  Card,
  Loader,
  NumberInput,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import useFirebase from '../../hooks/useFireBase';
import ProductCard from '../../Shared/ProductCard/ProductCard';

const Purchase = () => {
  const { id } = useParams();
  const { user } = useFirebase();
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery('product', () =>
    fetch(`${process.env.REACT_APP_BASE_URL}/products/${id}`).then((res) =>
      res.json()
    )
  );

  const form = useForm({
    initialValues: {
      phone: '',
      address: '',
      quantity: quantity,
      paymentStatus: '',
      deliveryStatus: '',
    },
  });

  function setNativeValue(element, value) {
    let lastValue = element.value;
    element.value = value;
    let event = new Event('input', { target: element, bubbles: true });
    // React 15
    event.simulated = true;
    // React 16
    let tracker = element._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
  }

  useEffect(() => {
    if (product?.minimumOrder) {
      const input = document.getElementById('inputQuantity');
      setNativeValue(input, parseInt(product?.minimumOrder));
    }
  }, [product]);

  useEffect(() => {
    if (
      quantity <= parseInt(product?.quantity) &&
      quantity >= parseInt(product?.minimumOrder)
    ) {
      setError(true);
    } else setError(false);
  }, [quantity]);

  const placeOrder = async (values) => {
    const { address, deliveryStatus, paymentStatus, phone } = values;
    const orderDetails = {
      name: user?.displayName,
      email: user?.email,
      address,
      deliveryStatus,
      paymentStatus,
      phone,
      productId: id,
      productName: product.name,
      price: (parseFloat(product.price) * quantity).toFixed(2),
      image: product.image,
      quantity,
      date: new Date(),
    };
    console.log(orderDetails);
    await axios.post(`${process.env.REACT_APP_BASE_URL}/orders`, orderDetails);
    await axios.put(`${process.env.REACT_APP_BASE_URL}/products/${id}`, {
      quantity: product.quantity - quantity,
    });
    refetch();
    form.reset();
    setQuantity(0);
    showNotification({
      color: 'green',
      title: 'Order Places Successfully',
      message: 'Proceed to my orders page for payment',
    });
  };

  if (isLoading) {
    return (
      <Loader className="m-auto" color="orange" size="xl" variant="dots" />
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-10">
      <h1 className="text-center md:py-10 pt-5">Place Your Order</h1>
      <div className="flex flex-col md:flex-row items-center justify-between md:justify-center mx-10 md:mx-[64px] md:gap-10">
        <div className="max-w-md ">
          <ProductCard {...product} />
        </div>
        <Card shadow="lg" className="w-[295px]">
          <form
            className="flex flex-col gap-2"
            onSubmit={form.onSubmit((values) => {
              placeOrder(values);
            })}
          >
            <TextInput
              label="Name"
              name="name"
              disabled
              value={user?.displayName || ''}
            />
            <TextInput
              label="Email"
              type="email"
              disabled
              value={user?.email || ''}
            />
            <TextInput
              type="text"
              name="phone"
              placeholder="Phone Number"
              label="Phone Number"
              {...form.getInputProps('phone')}
            />
            <Textarea
              placeholder="Your address"
              label="Your Address"
              {...form.getInputProps('address')}
            />

            <NumberInput
              id="inputQuantity"
              label="Enter Quantity"
              value={quantity}
              onChange={(val) => setQuantity(val)}
            />
            <div className="h-4">
              {!error && (
                <Text size="sm" color="red" className="animate-fadeIn">
                  {`${
                    quantity > product.quantity
                      ? 'Please input less or equal to available quanity'
                      : 'Please input for minimum quantity'
                  }`}
                </Text>
              )}
            </div>
            <Button
              type="submit"
              disabled={
                quantity <= product.quantity && quantity >= product.minimumOrder
                  ? false
                  : true
              }
            >
              Place Order
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Purchase;
