import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productFind } from "../../actions/productAction";
import CartHelper from "./CartHelper";
import axios from "axios";
const prodData = [];
let selectedAttribute = [];
let Data = [];
let subtotal = 0;
export default function TempCart({ match }) {
  const params = match.params.id

  var cartData = JSON.parse(atob(params))
  // let decoded = base64json.parse
  console.log(cartData)
  localStorage.removeItem("cart");
  localStorage.setItem("cart", JSON.stringify(cartData));
  // const id = match.params.id.toString();
  // console.log(id);
  // const dispatch = useDispatch();
  // const getProduct = useSelector((state) => state.getProduct);
  // const { product } = getProduct;
  // //   614a75b0a9c0ba3aeec9e66c-6149fcdfa9c0ba3aeec9e668&userId=61583832e565a34671df57f
  // let prodIds = id.split("&")[0];
  // let prodName = id.split("&")[1].split("=")[1];
  // let imgURL = id.split("&")[2].split("=")[1];
  // let prodBasePrice = Number(id.split("&")[3].split("=")[1]);
  // let qty = Number(id.split("&")[4].split("=")[1].split("$")[0]);
  // // &key=Thickness&value=4110NRC&price=3710$&key=Fabric&value=MS&price=33
  // // spliting attributes
  // if (id.search("$")) {
  //   let attributeSplit = id.split("$");

  //   for (let i = 1; i < attributeSplit.length; i++) {
  //     selectedAttribute.push({
  //       key: attributeSplit[i].split("&")[1].split("=")[1],
  //       value: attributeSplit[i].split("&")[2].split("=")[1],
  //       price: Number(attributeSplit[i].split("&")[3].split("=")[1]),
  //       parentKey: "",
  //     });
  //     console.log(selectedAttribute[i - 1].price);
  //     subtotal += selectedAttribute[i - 1].price;
  //   }
  // }

  // if (id.search("$")) {
  //   Data = [
  //     {
  //       id: prodIds,
  //       image: imgURL,
  //       name: prodName,
  //       price: subtotal,
  //       quantity: qty,
  //       selectedAttribute,
  //     },
  //   ];
  // } else {
  //   Data = [
  //     {
  //       id: prodIds,
  //       image: imgURL,
  //       name: prodName,
  //       price: prodBasePrice,
  //       quantity: qty,
  //     },
  //   ];
  // }
  // console.log(subtotal);
  // localStorage.removeItem("cart");
  // localStorage.setItem("cart", JSON.stringify(Data));
  // console.log(id.split("&")[4].split("=")[1])
  //   window.location("/cart");
  window.location.href = "http://ec2-3-239-208-80.compute-1.amazonaws.com/cart";

  // prodIds = prodIds.slice(10);
  //   console.log(prodIds);
  // let prodId = prodIds.split("-");

  // const demo = async (id) => {
  //   const { data } = await axios.post(
  //     "http://3.238.89.147:5000/api/product/detail",
  //     {
  //       productID: id,
  //     }
  //   );
  //   prodData.push(data);
  //   console.log(prodData);
  // };
  // for (let ids of prodId) {
  //   demo(ids);
  // }

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
      {/* <CartHelper /> */}
    </div>
  );
}
