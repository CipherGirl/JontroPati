import { AppShell, Group, Header, Navbar } from '@mantine/core';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import SideNavbar from '../../Shared/SideNavbar/SideNavbar';

const Dashboard = () => {
  return (
    <div class="flex">
      <SideNavbar />
      <div className="m-5 md:ml-[20rem]">
        <h1 className="my-3 text-3xl">Welcome To your Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
