import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productFind } from "../../actions/productAction";
import CartHelper from "./CartHelper";
import axios from "axios";
const prodData = [];
export default function TempCart({ match }) {
  const id = match.params.id.toString();
  const dispatch = useDispatch();
  const getProduct = useSelector((state) => state.getProduct);
  const { product } = getProduct;
  //   614a75b0a9c0ba3aeec9e66c-6149fcdfa9c0ba3aeec9e668&userId=61583832e565a34671df57f
  let prodIds = id.split("&")[0];
  prodIds = prodIds.slice(10);
  //   console.log(prodIds);
  let prodId = prodIds.split("-");

  const demo = async (id) => {
    const { data } = await axios.post(
      "http://3.238.89.147:5000/api/product/detail",
      {
        productID: id,
      }
    );
    prodData.push(data);
    console.log(prodData);
  };
  for (let ids of prodId) {
    demo(ids);
  }

  //   console.log(data);
  //   async function showProd() {
  //     for (const item of prodId) {
  //       const { data } = await axios.post(
  //         "http://3.238.89.147:5000/api/product/detail",
  //         {
  //           productID: item,
  //         }
  //       );
  //       prodData.push(data);
  //       console.log("Hello");
  //     }
  //   }
  //   showProd();
  //   console.log(prodData);
  //   console.log(p);
  // dispatch(productFind(id)););

  const findProd = async (id) => {
    // await dispatch(productFind(id));
  };

  //   useEffect(() => {
  //     dispatch(productFind(prodId[0]));
  //   }, []);

  return (
    <div>
      Loading...Please wait
      <CartHelper />
    </div>
  );
}
