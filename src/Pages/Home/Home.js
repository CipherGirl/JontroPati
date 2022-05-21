import { Banner } from './Banner';
import { Products } from './Products';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-evenly gap-20 my-20">
      <Banner />
      <Products />
    </div>
  );
};

export default Home;
