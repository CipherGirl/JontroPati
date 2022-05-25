import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  MediaQuery,
  ScrollArea,
  Text,
  useMantineTheme,
} from '@mantine/core';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProductCard = (props) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const {
    _id: id,
    name,
    description,
    image,
    price,
    minimumOrder,
    quantity,
  } = props;
  // const { title, description, image, price, minOrder, quantity } = {
  //   title: 'Product Name',
  //   description:
  //     'With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway',
  //   image: '/logo.png',
  //   price: '$400',
  //   minOrder: '100',
  //   quantity: '20000',
  // };

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div className="md:min-h-[480px] shadow-lg px-5 flex flex-col justify-evenly">
      <Card.Section>
        <div style={{ minHeight: '200px', width: '200px', margin: 'auto' }}>
          <Image
            src={image}
            alt="Norway"
            style={{
              objectFit: 'contain',
              margin: 'auto',
            }}
          />
        </div>
      </Card.Section>

      <Text weight={600} size="md" className="">
        {name}
      </Text>

      <Text size="md">
        Price per unit: <strong>{price}</strong>
      </Text>
      <Text size="md">Minimum Order: {minimumOrder}</Text>
      <Text size="md">quantity: {quantity}</Text>

      <ScrollArea style={{ height: 60, marginTop: 10 }}>
        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {description}
        </Text>
      </ScrollArea>

      {!window.location.href.includes('purchase') && (
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          fullWidth
          className="my-5"
          onClick={() => navigate(`/purchase/${id}`)}
        >
          Buy Now
        </Button>
      )}
    </div>
  );
};

export default ProductCard;
