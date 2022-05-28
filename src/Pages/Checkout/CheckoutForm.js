import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from '@mantine/core';

const CheckoutForm = (order) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const { price } = order;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);        }
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    setCardError(error?.message || '');
    setSuccess('');
    setProcessing(true);
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: order.name,
            email: order.email,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      setCardError('');
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);
      setSuccess('Congrats! Your payment is completed.');

      const payment = {
        order: order._id,
        transactionId: paymentIntent.id,
      };

      fetch(`${process.env.REACT_APP_BASE_URL}/orders/${order._id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
        });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <Button
          fullWidth
          variant="outline"
          color="blue"
          className="my-5"
          type="submit"
          disabled={!stripe}
        >
          {'Make Payment for  '}
          <span className="font-extrabold text-orange-500 pl-2">
            {'  $'}
            {order?.price}
          </span>
        </Button>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}
      {success && (
        <div className="text-green-500">
          <p>{success}</p>
          <p>
            Your transaction Id:{' '}
            <span className="text-orange-500 font-bold">{transactionId}</span>{' '}
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
