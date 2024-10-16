import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import Contact from "../components/Contact";
import Products from "../components/Products";
import Categories from "../components/Categories";

const Home = () => {
  return (
    <div>
      
      <Announcement />
      <Navbar />
      <Slider/>
      <Categories />
      <Products/>
      <Contact/>
      <Footer/>

    </div>
  );
};

export default Home;
