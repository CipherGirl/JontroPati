import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Login/Signup';
import Footer from './Shared/Footer/Footer';
import Navbar from './Shared/Navbar/Navbar';

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
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          {location.pathname !== '/login' &&
            location.pathname !== '/signup' && <Footer />}
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
