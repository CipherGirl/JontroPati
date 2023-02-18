import {
  Button,
  Card,
  Image,
  ScrollArea,
  Text,
  useMantineTheme,
} from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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

      <h3 className="font-medium">
        Price per unit: <strong>{price}</strong>
      </h3>
      {quantity ? (
        <>
          <h3 className="font-medium">Minimum Order: {minimumOrder}</h3>
          <h3 className="font-medium">Quantity: {quantity}</h3>
        </>
      ) : (
        <>
          <h3 className="font-medium">
            Quantity: <span className="text-red-500 italic">Sold Out</span>
          </h3>
        </>
      )}

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
