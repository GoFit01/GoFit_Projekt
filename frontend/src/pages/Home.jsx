import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import Contact from "../components/Contact";
import Products from "../components/Products";
import Motivation from "../components/Motivation";

const Home = () => {
  return (
    <div>
      
      <Announcement />
      <Navbar />
      <Slider/>
      <Motivation/>
      <Products/>
      <Contact/>
      <Footer/>

    </div>
  );
};

export default Home;
