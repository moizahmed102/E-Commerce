import React from "react";
import ProductList from "../components/ProductList";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

const Men = () => {
  return (
    <>
      <Header />
      <div>
        <ProductList category="Men" />
      </div>
      <Footer />
    </>
  );
};

export default Men;
