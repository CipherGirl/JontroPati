import {
  Badge,
  Button,
  Card,
  Group,
  Image,
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
    <Card shadow="xl" p="lg">
      <Card.Section>
        <Image
          src={image}
          alt="Norway"
          style={{
            maxHeight: '250px',
            width: '200px',
            objectFit: 'contain',
            margin: 'auto',
            padding: '20px 0px',
          }}
        />
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
          style={{ marginTop: 8 }}
          onClick={() => navigate(`/purchase/${id}`)}
        >
          Buy Now
        </Button>
      )}
    </Card>
  );
};

export default ProductCard;
