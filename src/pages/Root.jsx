import React, { useEffect } from 'react';
import Header from '../components/Header';
import { Outdent } from 'lucide-react';
import { Outlet, useNavigation } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LoadingOverlay from '../components/LoadingOverly';
import { links } from '../assets/links';
import { getRandomColor } from '@sarawebs/sb-utils';
import { useProducts } from '../hooks/useProducts';
export default function Root({ appName = 'This Site' }) {
  const navigation = useNavigation();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sb-theme-color',
      getRandomColor()
    );
  }, []);

  return (
    <>
      <Header
        subtitle=""
        left={<h2 className="header-logo">SaraShop</h2>}
        right={<Navbar links={links} />}
      />

      <main>
      {navigation.state === 'loading' && <LoadingOverlay />}
        <Outlet />
      </main>

      <Footer appName={appName} />
    </>
  );
}
