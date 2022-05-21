import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
} from '@mantine/core';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProductCard = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const { title, description, image, price, minOrder, quantity } = {
    title: 'Product Name',
    description:
      'With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway',
    image: '/logo.png',
    price: '$400',
    minOrder: '100',
    quantity: '20000',
  };

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Card shadow="sm" p="lg">
      <Card.Section>
        <Image
          src={image}
          alt="Norway"
          style={{
            height: '250px',
            width: '250px',
            objectFit: 'contain',
            margin: 'auto',
            padding: '20px 0px',
          }}
        />
      </Card.Section>

      <Group
        position="apart"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <Text weight={600} size="xl" mt="xl">
          {title}
        </Text>
        <Badge size="lg" color="green" variant="light">
          New
        </Badge>
      </Group>
      <Group
        position="apart"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <Text size="md">
          Price per unit: <strong>{price}</strong>
        </Text>
        <Text size="md">Minimu Order: {minOrder}</Text>
        <Text size="md">quantity: {quantity}</Text>
      </Group>

      <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        {description}
      </Text>

      <Button
        variant="light"
        color="blue"
        fullWidth
        style={{ marginTop: 14 }}
        onClick={() => navigate('/purchase')}
      >
        Buy Now
      </Button>
    </Card>
  );
};

export default ProductCard;
