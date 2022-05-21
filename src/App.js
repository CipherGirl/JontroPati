import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Footer from './Shared/Footer/Footer';
import Navbar from './Shared/Navbar/Navbar';

function App() {
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
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
          </Routes>
          <Footer />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
