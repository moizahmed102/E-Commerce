import React from "react";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import Footer from "../components/Footer"; 

const Women = () => {
  return (
    <>
      <Header /> 
      <div>
        <ProductList category="Women" />
      </div>
      <Footer />
    </>
  );
};

export default Women;
