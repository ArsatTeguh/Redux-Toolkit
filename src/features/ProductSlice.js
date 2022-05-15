import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

// ini akan berisi data dari API dan akan dirender di tampilan serta akan menjadi nilai reducer
export const getProducts = createAsyncThunk('product/getProducts', async() => {
  const response = await axios.get('http://localhost:5000/products');
  return response.data
});

// ini akan menjadi add product baru
export const addProduct = createAsyncThunk('product/addProducts', async({title, price}) => {
   const response = await axios.post('http://localhost:5000/products', {
     title, 
     price
  });
 return response.data;
});

// ini untuk mendelete product
export const deleteProduct = createAsyncThunk('product/deleteProducts', async(id) => {
   await axios.delete(`http://localhost:5000/products/${id}`);
  return id
});

// ini untuk edit product
export const updateProduct = createAsyncThunk('product/updateProducts', async({ id, title, price }) => {
  const response =  await axios.put(`http://localhost:5000/products/${id}`, {
     title,
     price
   });
  return response.data;
});

const productEntity = createEntityAdapter({
  selectId: (product) => product.id 
})

const productSlice = createSlice({
  // == set state yang akan == 
  // = nama state =
  name: 'product',
  // == value state ==
  // initialState: {
  //   title: '',
  //   price: ''
  // },

  // value state menggunakan entyti
  initialState: productEntity.getInitialState(),


  // reducers:{
  //  // == untuk mengupdate nilai state diatas ==
  //   update: (state, action) => {
  //     // == nilai state = nilai dari actions yang dikirim ==
  //     state.title = action.payload.title;
  //     state.price = action.payload.price;
  //   }
  // }

  // == reducer jika data yang dikirim adalah API == 
  extraReducers: {
    // == fulfilled fungsi yang dikembalikan oleh THUNK jika status 201/ok
    [getProducts.fulfilled] : (state, action) => {
      productEntity.setAll(state, action.payload);
    },
    [addProduct.fulfilled] : (state, action) => {
      productEntity.addOne(state, action.payload);
    },
    [deleteProduct.fulfilled] : (state, action) => {
      productEntity.removeOne(state, action.payload);
    },
    [updateProduct.fulfilled] : (state, action) => {
      productEntity.updateOne(state, { id:action.payload.id, updates:action.payload });
    },
  }
});

// export const {update} = productSlice.actions;
export default productSlice.reducer;
// == producerSelector berisi nilai state store  == 
export const productSelector = productEntity.getSelectors(state => state.product) 

