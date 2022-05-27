import { Outlet } from 'react-router-dom';
import SideNavbar from '../../Shared/SideNavbar/SideNavbar';

const Dashboard = () => {
  return (
    <div class=" min-h-[calc(100vh-64px)]">
      <SideNavbar />
      <div className="m-5 md:ml-[20rem]">
        <h1 className="my-3 text-3xl">Welcome To your Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
