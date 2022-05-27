import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import AddReview from './Pages/Dashboard/AddReview';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyOrders from './Pages/Dashboard/MyOrders';
import Profile from './Pages/Dashboard/Profile';
import Users from './Pages/Dashboard/Users';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RequireAdmin from './Pages/Login/RequireAdmin';
import RequireAuth from './Pages/Login/RequireAuth';
import SignUp from './Pages/Login/Signup';
import { Products } from './Pages/Products/Products';
import Purchase from './Pages/Purchase/Purchase';
import Footer from './Shared/Footer/Footer';
import Navbar from './Shared/Navbar/Navbar';
import ManageOrder from './Pages/Dashboard/ManageOrder';
import AddProduct from './Pages/Dashboard/AddProduct';

function App() {
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const location = useLocation();

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        emotionOptions={{ key: 'mantine' }}
        theme={{
          colorScheme,
          fontFamily: 'sans, sans-serif',
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <ModalsProvider>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route
                  path="/purchase/:id"
                  element={
                    <RequireAuth>
                      <Purchase />
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                >
                  <Route index element={<MyOrders />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="addreview" element={<AddReview />} />
                  <Route
                    path="users"
                    element={
                      <RequireAdmin>
                        <Users />
                      </RequireAdmin>
                    }
                  />
                  <Route
                    path="manageorder"
                    element={
                      <RequireAdmin>
                        <ManageOrder />
                      </RequireAdmin>
                    }
                  />
                  <Route
                    path="addproduct"
                    element={
                      <RequireAdmin>
                        <AddProduct />
                      </RequireAdmin>
                    }
                  />
                </Route>
              </Routes>
              {location.pathname == '/' &&
                location.pathname == '/blog' &&
                location.pathname !== '/contact' && <Footer />}
            </div>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
