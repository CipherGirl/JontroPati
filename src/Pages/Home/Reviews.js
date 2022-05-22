import {
  Avatar,
  Card,
  Center,
  Grid,
  Image,
  ScrollArea,
  Text,
} from '@mantine/core';

export const Reviews = () => {
  const threeItems = [1, 2, 3];

  return (
    <div className="w-[350px] md:w-auto">
      <h1 className="text-center font-bold mb-20 text-2xl md:text-4xl">
        Reviews
      </h1>
      <Grid grow>
        {threeItems.map((item) => (
          <Grid.Col span={4} key={item}>
            <ReviewCard />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

const ReviewCard = () => {
  return (
    <div class="w-[300px] md:w-[500px] border-2 border-blue-400 shadow-xl rounded-lg mx-auto">
      <div class="flex flex-col items-center mt-2">
        <Avatar size="lg" />
        <h2 class="font-semibold">Name</h2>
        <p class="text-gray-500">5/5</p>
      </div>
      <div class="p-4 border-t mx-8 mt-2">
        <ScrollArea style={{ height: 80 }}>
          <p class="text-sm  text-justify">
            Best website ever!Best website ever!Best website ever!Best website
            ever!Best website ever!Best website ever!Best website ever!Best
            website ever!Best website ever!Best website ever!Best website
            ever!Best website ever!
          </p>
        </ScrollArea>
      </div>
    </div>
  );
};
