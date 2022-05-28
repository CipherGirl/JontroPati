import {
  Avatar,
  Card,
  Center,
  Grid,
  Image,
  Loader,
  ScrollArea,
  Text,
} from '@mantine/core';
import { useQuery } from 'react-query';

export const Reviews = () => {
  const {
    data: reviews,
    isLoading,
    refetch,
    status,
    isIdle,
  } = useQuery(['reviews'], () =>
    fetch(`${process.env.REACT_APP_BASE_URL}/review/`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );
  const threeItems = [1, 2, 3];

  if (isLoading) {
    return (
      <Loader className="m-auto" color="orange" size="xl" variant="dots" />
    );
  }

  return (
    <div className="w-[350px] md:w-auto">
      <h1 className="text-center font-bold mb-20 text-2xl md:text-4xl">
        Reviews
      </h1>
      {reviews?.length > 0 && (
        <Grid grow>
          {reviews
            ?.slice(-3)
            .reverse()
            .map((item) => (
              <Grid.Col span={4} key={item.name}>
                <ReviewCard {...item} />
              </Grid.Col>
            ))}
        </Grid>
      )}
    </div>
  );
};

const ReviewCard = ({ name, rating, review }) => {
  return (
    <div class="w-[300px] md:w-[500px] border-2 border-blue-400 shadow-xl rounded-lg mx-auto">
      <div class="flex flex-col items-center mt-2">
        <Avatar size="lg" />
        <h2 class="font-semibold">{name}</h2>
        <p class="text-gray-500">{rating}</p>
      </div>
      <div class="p-4 border-t mx-8 mt-2">
        <ScrollArea style={{ height: 80 }}>
          <p class="text-sm  text-justify">{review}</p>
        </ScrollArea>
      </div>
    </div>
  );
};
