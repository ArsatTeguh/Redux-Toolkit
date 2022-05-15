import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct, getProducts, productSelector } from '../features/ProductSlice';


function EditProduct() {
  const [ title, setTitle] = useState("");
  const [ price, setPrice ] = useState("");

  // useDispatch berfungsi menjembati aksi update
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {id} = useParams()

  // mengambil data berdasarkan id
  const product = useSelector((state) => productSelector.selectById(state, id))

  // ini agar kita menrender semua data yang ada di store
  useEffect(() => {
    dispatch(getProducts())
  },[dispatch])

  // mengambil data product dan men set ke state lokal 
  useEffect(() => {
    if(product) {
      setTitle(product.title)
      setPrice(product.price)
    }
  },[product])

  const handleUpdate = async (e) => {
    e.preventDefault()
    if((title && price).length > 0){
      await dispatch(updateProduct({id, title, price}))
      navigate('/')
    }else {
      alert('data tidak boleh kosong')
    }
  }

  return (
    <>
      <form  className="box mt-5">
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
          <div onClick={handleUpdate} className="button is-success">Edit</div>
        </div>
      </form>
    </>
  );
}

export default EditProduct;
