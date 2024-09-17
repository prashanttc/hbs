import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Feature from '../components/feature';
import Property from '../components/Property';
import Footer from '../components/Footer';
import FeaturedProperty from '../components/FeaturedPropertyy';

const Home = () => {
  return (
    <div className="w-full"> 
      <Navbar />
      <Header />
      <div className="px-5 md:px-10 lg:px-20">
        <Feature />
        <Property />
        <FeaturedProperty />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
