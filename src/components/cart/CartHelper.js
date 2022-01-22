import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Spinner from "../common/Spinner";
import Axios from "axios";
import {
  API_URL,
  IMAGE_URL,
  groupBy,
  multigroupBy,
} from "../../actions/constant";
import Currency from "../common/Currency";
import swal from "sweetalert2";
import { addToCart, getCart } from "../../actions/cartAction";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../actions/wishlistAction";
const Toast = swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

const queryString = require("query-string");

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: {},
      productLoading: false,
      attributeData: [],
      attributeLoading: false,
      quantity: 1,
      parsed: "614a75b0a9c0ba3aeec9e66c",
      selectedAttribute: [],
      currentIndex: 0,
      totalPrice: 0,
      edit: false,
    };
    this.onSelectDropdown = this.onSelectDropdown.bind(this);
  }
  componentDidMount() {
    if (this.state.parsed.edit) {
      this.setState({
        edit: true,
      });
    }
    if (this.state.parsed.productID) {
      this.getProductData();
      if (localStorage.cart) var cartVal = JSON.parse(localStorage.cart);
      if (cartVal) {
        this.setQuantity(cartVal);
      }
    }
  }

  setQuantity(cartValue) {
    const parsed = queryString.parse(this.props.location.search);
    var quantityVal = cartValue.find((x) => x.id === parsed.productID);
    var totalCost = cartValue.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    if (quantityVal) {
      this.setState({
        quantity: quantityVal.quantity,
        selectedAttribute: quantityVal.selectedAttribute,
        totalPrice: totalCost,
      });
    }
  }

  getProductData() {
    this.setState({
      productLoading: true,
      attributeLoading: false,
    });
    Axios.post(API_URL + `/api/product/detail`, {
      productID: this.state.parsed.productID,
    })
      .then((result) => {
        this.setState({
          productLoading: false,
          productData: result.data,
        });
      })
      .catch((err) => {
        this.setState({
          productLoading: false,
          productData: {},
        });
      });
    Axios.post(API_URL + `/api/product/attribute`, {
      productID: this.state.parsed.productID,
    })
      .then((result) => {
        this.setState({
          attributeLoading: false,
          attributeData: result.data,
        });
      })
      .catch((err) => {
        this.setState({
          attributeLoading: false,
          attributeData: {},
        });
      });
  }
  componentWillReceiveProps(nextProps) {
    console.log("data added");
    if (nextProps.cart !== this.props.cart) {
      localStorage.setItem("cart", JSON.stringify(nextProps.cart));
      Toast.fire({
        type: "success",
        title: !this.state.edit ? "Added to Cart" : "Cart Updated",
      }).then((result) => {
        if (this.state.edit) {
          this.props.history.push(`/cart`);
        }
      });
    }
    if (nextProps.wishlist !== this.props.wishlist) {
      localStorage.setItem("wishlist", JSON.stringify(nextProps.wishlist));
      Toast.fire({
        type: "success",
        title: "Added to Wishlist",
      });
    }
  }

  addToCart(product) {
    console.log("this.state.totalPrice", this.state.totalPrice);

    if (this.state.totalPrice === 0) {
      Toast.fire({
        type: "error",
        title: "Select Attribute List",
      });
      return;
    }

    const cartItem = {
      id: product._id,
      image: product.photoUrl1,
      name: product.name,
      quantity: this.state.quantity,
      price: this.state.totalPrice,
      selectedAttribute: this.state.selectedAttribute,
    };
    this.props.addToCart(cartItem);
  }

  onSelectDropdown(e, keys, parentKey = "") {
    var temp = this.state.selectedAttribute;
    var price = e.target.selectedOptions[0].getAttribute("data-price");
    var findKey = temp.find((x) => x.key === keys);

    if (findKey) {
      temp = temp.filter((x) => x.key != keys);
      temp = temp.filter((x) => x.parentKey != keys);
    }
    temp.push({
      key: keys,
      value: e.target.value,
      price: price,
      parentKey: parentKey,
    });
    var total = temp.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
    this.setState({
      selectedAttribute: temp,
      totalPrice: total,
    });
  }

  onSelectList(key, value, price, parentKey = "") {
    var temp = this.state.selectedAttribute;
    var findKey = temp.find((x) => x.key === key);

    if (findKey) {
      temp = temp.filter((x) => x.key != key);
      temp = temp.filter((x) => x.parentKey != key);
    }
    temp.push({ key: key, value: value, price: price, parentKey: parentKey });
    var total = temp.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
    this.setState({
      selectedAttribute: temp,
      totalPrice: total,
    });
  }

  onRenderSubField(data, parentKey) {
    var dependentField = [];
    var datas = data.map((result) => {
      if (result.type === "dropdown") {
        return (
          <React.Fragment>
            <h3 style={{ marginTop: 20 }}>{result.label}</h3>
            <select
              id='select-el'
              className='combo combo-input'
              onChange={(e) =>
                this.onSelectDropdown(e, result.label, parentKey)
              }
            >
              <option value=''>Select</option>
              {result.list.map((attrres) => {
                var findSelected = this.state.selectedAttribute.find(
                  (x) => x.value === attrres.value
                );
                return (
                  <option
                    selected={findSelected ? true : null}
                    value={attrres.value}
                    data-price={attrres.additionalPrice}
                  >
                    {attrres.label}{" "}
                    {parseInt(attrres.additionalPrice) > 0 &&
                      `[+ $ ${attrres.additionalPrice} ]`}
                  </option>
                );
              })}
            </select>
          </React.Fragment>
        );
      }
      if (result.type === "image+text") {
        return (
          <ul className='profile-g pointer' style={{ marginTop: 20 }}>
            {result.list.map((attrres) => {
              var findSelected = this.state.selectedAttribute.find(
                (x) => x.value === attrres.mappingValue
              );

              return (
                <li
                  className={findSelected ? "border" : null}
                  onClick={() =>
                    this.onSelectList(
                      attrres.label,
                      attrres.value,
                      attrres.additionalPrice,
                      parentKey
                    )
                  }
                >
                  <img src={`${IMAGE_URL}${attrres.photoUrl}`} />
                  <span>
                    {attrres.mappingLabel}{" "}
                    {parseInt(attrres.additionalPrice) > 0 &&
                      `[+ $ ${attrres.additionalPrice} ]`}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }
      if (result.type === "color") {
        return (
          <ul className='profile-g pointer' style={{ marginTop: 20 }}>
            {result.list.map((attrres) => {
              var findSelected = this.state.selectedAttribute.find(
                (x) => x.value === attrres.value
              );
              return (
                <li
                  className={findSelected ? "border" : null}
                  onClick={() =>
                    this.onSelectList(
                      attrres.label,
                      attrres.value,
                      attrres.additionalPrice,
                      parentKey
                    )
                  }
                >
                  <span
                    style={{
                      width: 25,
                      height: 25,
                      backgroundColor: attrres.value,
                      borderColor: "#fff",
                    }}
                  ></span>
                  <span>
                    {attrres.label}{" "}
                    {parseInt(attrres.additionalPrice) > 0 &&
                      `[+ $ ${attrres.additionalPrice} ]`}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }
    });
    return datas;
  }
  render() {
    const { listhome, homeloading } = this.props.home;
    const {
      productData,
      productLoading,
      attributeLoading,
      attributeData,
      totalPrice,
      selectedAttribute,
    } = this.state;

    var attributeList;
    if (!attributeLoading && Object.keys(attributeData).length > 0) {
      attributeList = attributeData.map((result, index) => {
        var attributes = result.attributes;
        const groupedAttribute = groupBy(attributes, "attributeName");

        var fields = [];
        Object.entries(groupedAttribute).map(([key, value]) => {
          if (value.length > 0) {
            var mappingType = value[0].mappingType;

            if (mappingType === "dropdown") {
              fields.push(<h3>{key}</h3>);
              fields.push(
                <select
                  id='select-el'
                  className='combo combo-input'
                  onChange={(e) => this.onSelectDropdown(e, key)}
                >
                  <option value=''>Select</option>
                  {value
                    .sort(function (a, b) {
                      return new Date(a.date) - new Date(b.date);
                    })
                    .map((attrres) => {
                      var findSelected = selectedAttribute.find(
                        (x) => x.value === attrres.mappingValue
                      );
                      return (
                        <option
                          selected={findSelected ? true : null}
                          value={attrres.mappingValue}
                          data-price={attrres.additionalPrice}
                        >
                          {attrres.mappingLabel}{" "}
                          {parseInt(attrres.additionalPrice) > 0 &&
                            `[+ $ ${attrres.additionalPrice} ]`}
                        </option>
                      );
                    })}
                </select>
              );
            }
            if (mappingType === "image+text") {
              fields.push(
                <ul className='profile-g pointer'>
                  {value
                    .sort(function (a, b) {
                      return new Date(a.date) - new Date(b.date);
                    })
                    .map((attrres) => {
                      var findSelected = selectedAttribute.find(
                        (x) => x.value === attrres.mappingValue
                      );
                      return (
                        <li
                          className={findSelected ? "border" : null}
                          onClick={() =>
                            this.onSelectList(
                              key,
                              attrres.mappingValue,
                              attrres.additionalPrice
                            )
                          }
                        >
                          <img src={`${IMAGE_URL}${attrres.photoUrl}`} />
                          <span>
                            {attrres.mappingLabel}{" "}
                            {parseInt(attrres.additionalPrice) > 0 &&
                              `[+ $ ${attrres.additionalPrice} ]`}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              );
            }
            if (mappingType === "color") {
              fields.push(
                <ul className='profile-g pointer'>
                  {value
                    .sort(function (a, b) {
                      return new Date(a.date) - new Date(b.date);
                    })
                    .map((attrres) => {
                      var findSelected = selectedAttribute.find(
                        (x) => x.value === attrres.mappingValue
                      );
                      return (
                        <li
                          className={findSelected ? "border" : null}
                          onClick={() =>
                            this.onSelectList(
                              key,
                              attrres.mappingValue,
                              attrres.additionalPrice
                            )
                          }
                        >
                          <span>
                            {attrres.mappingLabel}{" "}
                            {parseInt(attrres.additionalPrice) > 0 &&
                              `[+ $ ${attrres.additionalPrice} ]`}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              );
            }
            //FIND ARRAY
            var findSelectedAttribute = selectedAttribute.find(
              (x) => x.key === key
            );
            if (findSelectedAttribute) {
              var subFields = value.find(
                (x) => x.mappingValue === findSelectedAttribute.value
              );
              if (subFields) {
                var dependentField = JSON.parse(subFields.dependentField);

                fields.push(
                  this.onRenderSubField(
                    dependentField,
                    findSelectedAttribute.key
                  )
                );
              }
            }
          }
        });

        return (
          <div>
            <input
              id={`ac-${index}`}
              name='accordion-1'
              type='radio'
              defaultChecked={index === this.state.currentIndex}
            />
            <label htmlFor={`ac-${index}`}>
              <span>{index + 1}</span> {result.parentAttributeName}
            </label>
            <article>
              <div className='row'>
                <div className='col-md-12'>{fields}</div>
              </div>
            </article>
          </div>
        );
      });
    }

    return (
      <div>
        {!homeloading && !productLoading && !attributeLoading ? (
          <React.Fragment>
        
            <main id='page'>
                
              {/* <!-- ======= Breadcrumbs ======= --> */}
    
              {/* <!--Product banner--> */}
              <div id='product-banner' className='product-banner'>
                {/* <img src="/assets/img/product-banner.jpg" /> */}
                <img src={`${IMAGE_URL}${productData.photoUrl2}`} />
                <div className='pro-banner-text'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='price'>
                          <h4>
                            Starting at{" "}
                            <span>
                              <Currency /> {productData.price}
                            </span>{" "}
                            <Link to='/'>4.8 (20 reviews)</Link>
                          </h4>
                          <h2>{productData.name}</h2>
                          <p>{productData.description}</p>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='ac-container'>
                          {attributeList}
                          <div className='price-bar'>
                            <p>
                              <Currency /> {totalPrice}
                            </p>
                            <Link
                              to='#'
                              onClick={(e) => {
                                e.preventDefault();
                                this.addToCart(productData);
                              }}
                            >
                              {!this.state.edit ? "BUY NOW" : "Update Now"}
                            </Link>{" "}
                          </div>
                          <h4 className='extra'>
                            TYPICAL SHIPPING LEAD TIME: <span>3 WEEKS</span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </React.Fragment>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}
ProductDetail.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  home: state.home,
  cart: state.cart,
  wishlist: state.wishlist,
});

export default connect(mapStateToProps, { addToCart, getCart })(
  withRouter(ProductDetail)
);
