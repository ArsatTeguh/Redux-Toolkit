import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/ProductSlice";
import { useNavigate } from "react-router-dom";
// import { update } from '../features/ProductSlice'

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();
  // useDispatch berfungsi menjembati aksi update
  const dispatch = useDispatch();

  // const updateStore = (e) => {
  //   e.preventDefault();
  //    // update data ke slice
  //   dispatch(update({title, price}));
  // }

  const createProduct = async (e) => {
    e.preventDefault()
   if((title && price).length > 0){
    await dispatch(addProduct({title, price}))
    navigate('/')
   }else {
   alert('tolong isi semua formnya')
   }
  };

  return (
    <>
      <form className="box mt-5">
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Tilte"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <div className="button is-success" onClick={createProduct}>Submit</div>
        </div>
      </form>
    </>
  );
};

export default AddProducts;
