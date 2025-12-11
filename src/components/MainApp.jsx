import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Categories from './Categories';
import FeaturedProducts from './FeaturedProducts';
import HowItWorks from './HowItWorks';
import Footer from './Footer';

const MainApp = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default MainApp;