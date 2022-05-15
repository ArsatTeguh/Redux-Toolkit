import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, productSelector, deleteProduct } from "../features/ProductSlice";
import {Link} from 'react-router-dom'

function ShowProduct() {
  // mengkonsumsi state dari store
  // const { title, price } = useSelector((state) => state.product)
  const product = useSelector(productSelector.selectAll);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="box mt-5">
        <Link to="add" className="button is-success">Add New</Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.map((data, index) => {
           return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.title}</td>
                <td>{data.price}</td>
                <td>
                  <Link to={`edit/${data.id}`} className="button is-info is-small">Edit</Link>
                  <button onClick={() => dispatch(deleteProduct(data.id)) } className="button is-danger is-small">Delete</button>
                </td>
              </tr>
            )
          })}

        </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowProduct;
