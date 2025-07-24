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
import { useApp } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

export default function Root() {
  const navigation = useNavigation();
  const { appName } = useApp();

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
        left={<h2 className="header-logo">{appName}</h2>}
        right={<Navbar links={links} />}
      />

      <main key={location.pathname}>
        {navigation.state === 'loading' && <LoadingOverlay />}
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
