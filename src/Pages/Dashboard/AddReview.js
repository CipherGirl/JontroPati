import {
  Button,
  Loader,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import useFirebase from '../../hooks/useFireBase';

const AddReview = () => {
  const { user } = useFirebase();
  const [rating, setRating] = useState('⭐⭐⭐⭐⭐');
  const { register, handleSubmit, reset } = useForm();

  const {
    data: currentUser,
    isLoading,
    refetch,
    status,
    isIdle,
  } = useQuery(['myProfile', user?.email, 'profile'], () => fetchUser(), {
    enabled: !!user.email,
  });

  const fetchUser = async () => {
    const request = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/${user?.email}`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return await request.json();
  };

  const onSubmit = async (data) => {

    fetch(`${process.env.REACT_APP_BASE_URL}/user/${user?.email}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ rating: rating, review: data.review }),
    })
      .then((res) => res.json())

      .then((data) => {
        reset();
        refetch();
        showNotification({
          color: 'green',
          title: 'Review Added!',
          message:
            'Thank you for your review! We apperciate words from our customers.',
          autoClose: 4000,
        });
      });
  };

  console.log(currentUser);

  if (isLoading) {
    <p>Loading</p>;
  }

  return (
    <div>
      <h1>Add Review</h1>
      {currentUser?.review && (
        <div className="my-6">
          <h2 className="text-xl">Your Review</h2>
          <h2>Rating: {currentUser?.rating}</h2>
          <h2>Review: {currentUser?.review}</h2>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
        <Select
          label="Rating"
          required
          value={rating}
          onChange={(rating) => setRating(rating)}
          style={{ width: 150 }}
          data={[
            { value: '⭐', label: '⭐' },
            { value: '⭐⭐', label: '⭐⭐' },
            { value: '⭐⭐⭐', label: '⭐⭐⭐' },
            { value: '⭐⭐⭐⭐', label: '⭐⭐⭐⭐' },
            { value: '⭐⭐⭐⭐⭐', label: '⭐⭐⭐⭐⭐' },
          ]}
        />
        <Textarea
          required
          label="Review"
          minRows={6}
          placeholder="Detail Review"
          {...register('review')}
        />

        <Button
          className="m-auto md:m-0"
          variant="gradient"
          type="submit"
          gradient={{ from: 'yellow', to: 'orange' }}
          style={{ marginTop: 8, maxWidth: '130px' }}
        >
          Add Review
        </Button>
      </form>
    </div>
  );
};

export default AddReview;
