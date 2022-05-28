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
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import useFirebase from '../../hooks/useFireBase';

const Profile = () => {
  const { user } = useFirebase();
  const [rating, setRating] = useState('⭐⭐⭐⭐⭐');
  const { register, handleSubmit, reset } = useForm();
  const [userInfo, setUserInfo] = useState({});

  const {
    data: currentUser,
    isLoading,
    refetch,
    status,
    isIdle,
  } = useQuery(['myProfileUpdate', user?.email, 'profile'], () => fetchUser(), {
    enabled: !!user.email,
  });

  useEffect(() => {
    setUserInfo(currentUser);
  }, [currentUser]);

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
    const updatedUserInfo = {
      phone: data.phone || userInfo.phone,
      profession: data.profession || userInfo.profession,
      location: data.location || userInfo.location,
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/user/${user?.email}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(updatedUserInfo),
    })
      .then((res) => res.json())

      .then((data) => {
        reset();
        refetch();
        showNotification({
          color: 'green',
          title: 'Profile Updated!',
          message: 'Successfully updated yout profile information',
          autoClose: 4000,
        });
      });
  };

  if (isLoading) {
    <p>Loading</p>;
  }

  return (
    <div>
      <h1>Your Profile</h1>
      {currentUser?.name && (
        <div className="my-6">
          <h2>Name: {currentUser?.name}</h2>
          <h2>Email: {currentUser?.email}</h2>
          <h2>Phone: {currentUser?.phone}</h2>
          <h2>Profession: {currentUser?.profession}</h2>
          <h2>Location: {currentUser?.location}</h2>
        </div>
      )}
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
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
          label="Phone"
          placeholder="Phone Number"
          {...register('phone')}
        />
        <TextInput
          label="Profession"
          placeholder="What is your professtion?"
          {...register('profession')}
        />
        <TextInput
          label="Location"
          placeholder="City/County"
          {...register('location')}
        />

        <Button
          className="m-auto md:m-0"
          variant="gradient"
          type="submit"
          gradient={{ from: 'yellow', to: 'orange' }}
          style={{ marginTop: 8, maxWidth: '150px' }}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default Profile;
