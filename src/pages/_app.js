// pages/_app.js
import '@/styles/globals.css'; 
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* <Header /> */}
        <div style={{ flex: 1 }}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
