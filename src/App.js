import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddProducts from "./Components/AddProducts";
import EditProduct from "./Components/EditProduct";
import ShowProduct from "./Components/ShowProduct";

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <Routes>
        <Route path="/" element={<ShowProduct/>} />
        <Route path="add" element={<AddProducts/>} />
        <Route path="edit/:id" element={<EditProduct/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
