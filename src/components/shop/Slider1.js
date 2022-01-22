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
      var sliderRender=slider.map((result,index)=>{
          if(index <4){
            return    <div className="col-sm-3 ma-0">
            <div className="horizontal-card">
              <div className="zoom-card is-lg lazy" data-original="assets/img/insta-5.jpg" style={{backgroundImage: `url(${IMAGE_URL}${result.photoUrl})`}}>
                <Link className="card__link-wrapper" to={`/shop?categoryID=${this.props.parsed.categoryID}&showproduct=1&slider=2`}><div className="content__inner">{result.sliderName}
                    <i className="fa fa-arrow-right" aria-hidden="true" />
                  </div>
                </Link>
              </div>
              <div className="gradient" />
            </div>
          </div>
          }
       
      })
    
        return (
          <section className="acoustic_card">
          <div>
            <div className="row">
              
             {sliderRender}
              <div />
            </div>
          </div>
        </section>
           
        )
    }
}

