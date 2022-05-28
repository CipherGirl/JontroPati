import { Button, Loader, NumberInput, TextInput } from '@mantine/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

const AddProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery('allProducts', () =>
    fetch(`${process.env.REACT_APP_BASE_URL}/products`).then((res) =>
      res.json()
    )
  );

  const imageStorageKey = process.env.REACT_APP_IMAGEBB_KEY;

  const onSubmit = async (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const product = {
            name: data.name,
            description: data.description,
            price: data.price,
            image: img,
            minimumOrder: data.minimumOrder,
            quantity: data.quantity,
          };
          fetch(`${process.env.REACT_APP_BASE_URL}/products`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                showNotification({
                  color: 'teal',
                  title: 'Product Added  Successfully',
                  message: 'New product has been added to Jotropati',
                });
                reset();
              } else {
                console.log('Failed to add the product');
              }
            });
        }
      });
  };

  if (isLoading) {
    return (
      <Loader className="m-auto" color="orange" size="xl" variant="dots" />
    );
  }

  return (
    <div>
      <h2 className="text-2xl">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
        <TextInput
          required
          label="Name"
          placeholder="Product Name"
          {...register('name')}
        />
        <TextInput
          required
          label="Description"
          placeholder="Prduct Description"
          {...register('description')}
        />
        <NumberInput
          required
          label="Price"
          placeholder="Enter price per unit"
          {...register('price')}
        />
        <NumberInput
          required
          label="Quantity"
          placeholder="Quantity"
          {...register('quantity')}
        />
        <NumberInput
          required
          label="Minimum Order"
          placeholder="Minimum number of pieces to place order"
          {...register('minimumOrder')}
        />
        <label class="block mt-2">
          <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Image
          </span>
          <input
            type="file"
            required
            class="block border p-1 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-500 hover:file:bg-orange-100 mt-2"
            {...register('image', {
              required: {
                value: true,
                message: 'Image is Required',
              },
            })}
          />
        </label>

        <Button
          className="m-auto md:m-0"
          variant="gradient"
          type="submit"
          gradient={{ from: 'yellow', to: 'orange' }}
          style={{ marginTop: 8, maxWidth: '130px' }}
        >
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
