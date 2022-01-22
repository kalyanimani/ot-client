import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import appendScript from '../../utils/appendScript'
import removeScript from '../../utils/removeScript'
import OwlCarousel from 'react-owl-carousel2';
import $ from 'jquery';
import {lang} from '../../actions/language'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { IMAGE_URL } from '../../actions/constant';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1// optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

class CaseStudy extends Component {
  constructor(props){
    super(props)
    this.state={
        search:""
    }
}
onBlogDetail(data){
  localStorage.setItem("blogdetail",JSON.stringify(data))
  this.props.history.push("/blogdetail")

}

render() {
      const {casestudy}=this.props;
      const {isAuthenticated}=this.props.auth;

      var caseRender=casestudy.map(result=>{
        return  <div className="col-lg-12">
              <div className="case-study"> 
                <img src={`${IMAGE_URL}${result.photoUrl}`} />
                <div dangerouslySetInnerHTML={{ __html:             result.shortContent.length>60? result.shortContent.substring(0, 57) + "..." :  result.shortContent} } />

     
                <Link to="#" onClick={(e)=>{
                  e.preventDefault();
                  this.onBlogDetail(result)
                }}>CASE STUDY</Link> 
              </div>
        </div>
       
        
 
      })
        return (
          <section id="casestudy_sec" className="casestudy_sec">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 order-2 order-lg-1">
              <div className="icon-box mt-5 mt-lg-0"> <span>{lang.blogTitle}</span>
        <h4>Case <br />
          Studies</h4>
      </div>
                
                <ul className="case-study_arro">
                    <li className="bg_col_non" ><i onClick={()=>{this.Carousel.previous()}}  className="fas fa-chevron-left" /></li>
                    <li><i className="fas fa-chevron-right" onClick={()=>{this.Carousel.next()}}/></li>
                </ul>
              </div>
              <div className="image col-lg-8 order-1 order-lg-2">
                
                <Carousel
            ref={(el) => (this.Carousel = el)} 
            arrows={false}
            swipeable={true}
            draggable={true}
            showDots={false}
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
            
            arrows={false}
          >
          
                  {caseRender}
          </Carousel>       
                </div>
              </div>
            </div>
          
        </section>
           )}
}
CaseStudy.propTypes = {
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
CaseStudy.defaultProps={
    casestudy:[]
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  cart:state.cart,
  wishlist:state.wishlist,
})

export default connect(mapStateToProps,{})(withRouter(CaseStudy));
