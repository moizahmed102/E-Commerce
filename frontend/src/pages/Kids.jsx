import React from "react";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import Footer from "../components/Footer"; 

const Kids = () => {
  return (
    <>
      <Header /> 
      <div>
        <ProductList category="Kids" />
      </div>
      <Footer /> 
    </>
  );
};

export default Kids;
