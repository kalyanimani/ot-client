import React, { Component } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from 'react-router-dom';
import { IMAGE_URL } from '../../actions/constant';
import Currency from '../common/Currency';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1// optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const CustomDot = ({ onMove, index, onClick, active }) => {
    // onMove means if dragging or swiping in progress.
    // active is provided by this lib for checking if the item is active or not.
    return (
      <li
        className={active ? "b-p-a" : "b-w-a"}
        onClick={() => onClick()}
      >
        <i class="far fa-circle"></i>
      </li>
    );
  };

export default class Slider extends Component {
    render() {
      const {slider}=this.props;
      var sliderRender=slider.map(result=>{
        return    <div className="carousel-item active carousel-item-left"> <img className="d-block w-100" src={`${IMAGE_URL}${result.photoUrl}`} alt="First slide" />
        <div className="carousel-caption d-none d-md-block">
          <div className="market-con">
            {result.product && <div className="slider-content">
              <h2>{result.product && result.product.name}</h2>
      <span><Currency/> {result.product &&result.product.price}</span>{result.product &&<Link to={`/productdetail?productID=${result.product._id}`}>Buy Now</Link>}</div>}
          </div>
        </div>
      </div>
      })
        return (
        <div class="market-banner s-h"> 
          <div >
            <Carousel
                ref={(el) => (this.Carousel = el)} 
                arrows={false}
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                arrows={true}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={this.props.deviceType}
                // dotListClass="custom-dot-list-style"
                // itemClass="carousel-item-padding-40-px item-slide"
                customDot={<CustomDot />}
                arrows={false}
            >
              {sliderRender}
              </Carousel>
         
        </div>
        <ul className="mar_ban_ind">
        <li className="arw_l" onClick={()=>{this.Carousel.previous()}}><img src="assets/img/icon/l-p.png" /></li>
        <li className="arw_r" onClick={()=>{this.Carousel.next()}}><img src="assets/img/icon/r-p.png" /></li>
      </ul>
      </div>
           
        )
    }
}

