import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Header from '../layouts/Header';
import CaseStudy from '../layouts/CaseStudy';
import Footer from '../layouts/Footer';
import Spinner from '../common/Spinner';
import Slider from './Slider';
import LeftMenu from './LeftMenu';
import ProductCard from './ProductCard';
import AdCard from './AdCard';
import {listProduct,listProductSlider} from'../../actions/productAction';
import {lang} from '../../actions/language';
import FeatureList from '../layouts/FeatureList';
import Hashtag from '../layouts/Hashtag';
import Carousel from "react-multi-carousel";
import { IMAGE_URL } from '../../actions/constant';

import "react-multi-carousel/lib/styles.css";
const queryString = require('query-string');
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

class PreProduct extends Component {
    constructor(props){
        super(props)
        this.state={
            parsed:queryString.parse(this.props.location.search),
            category:[],
            search:""
        }
        this.onSearch=this.onSearch.bind(this);
    }

    componentDidMount(){
        this.getProduct();
      
    }

    getProduct(){
        const parsed = this.state.parsed;
        if(parsed.categoryID && !parsed.subcategoryChildID){
            this.props.listProduct({categoryID:parsed.categoryID})
            this.props.listProductSlider({categoryID:parsed.categoryID});
        }else if(parsed.categoryID && parsed.subcategoryChildID){
          console.log("if eledse")
          console.log("categoryID",parsed.categoryID)
          console.log("subcategoryID",parsed.subcategoryID)
          console.log("subcategoryID",parsed.subcategoryChildID)
          this.props.listProduct({subcategoryChildID:parsed.subcategoryChildID})
         this.props.listProductSlider({categoryID:parsed.categoryID});
      }
        else if(parsed.search){
            this.props.listProduct({search:parsed.search})
        }

        if(parsed.categoryID){
            this.props.listProductSlider({categoryID:parsed.categoryID});
        }
    }

    onSearch(e){
        e.preventDefault();
        if(this.state.search !=""){
          this.props.history.push(`/shop?search=${this.state.search}`)
        }else{
          this.props.history.push(`/shop`)
        }
       
      }

      componentDidUpdate (prevProps) {
        if (prevProps.location.key !== this.props.location.key) {
          window.scrollTo(0,0)
          console.log("get prodyct called")
          this.getProduct()
        }
    }

    render() {
        const {listhome,homeloading}=this.props.home;
        const {listproduct,productloading,productslider}=this.props.product;
        var productContent=[];
        if(listproduct !=null && Object.keys(listproduct).length >0){
       
            listproduct.map((result,index)=>{
                // if(index >=1 && index % 3 ===0){
                //     productContent.push(
                //         <AdCard history={this.props.history} product={listproduct}/>
                //     )
                // }
                if(index <=2){
productContent.push (<ProductCard parsed={this.state.parsed} product={result} className="li-product col-md-3 mr-l-0"/> )
                }
                
            })
        }

        var  sliderRender=(<div></div>);
        if(productslider !=null &&productslider.slider.length >0){
            var slider=productslider.slider;
             sliderRender=slider.map(result=>{
              return <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active banner_sec">
                  <img className="d-block w-100" src={`${IMAGE_URL}${result.photoUrl}`} alt="First slide" />
                </div>
               
              </div>
              <div className="pro-banner-text">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="price ml_al wd-80">
                        <h2>{result.sliderTitle}</h2>
                        <p>{result.sliderDesc}</p>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="sound_recoding_aud row">
                        <div className="col-md-3">
                          <a id="play-video" className="video-launch video-play-button" rel="shadowbox;height=450;width=800" href="https://player.vimeo.com/video/198890171?color=257CB2&title=0&byline=0&portrait=0">
                            <span />
                          </a>
                        </div>
                        <div className="col-md-6">
                          <div className="loader">
                            <svg id="wave" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 38.05">
                              <path id="Line_1" data-name="Line 1" d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z" />
                              <path id="Line_2" data-name="Line 2" d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z" />
                              <path id="Line_3" data-name="Line 3" d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z" />
                              <path id="Line_4" data-name="Line 4" d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z" />
                              <path id="Line_5" data-name="Line 5" d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z" />
                              <path id="Line_6" data-name="Line 6" d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z" />
                              <path id="Line_7" data-name="Line 7" d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z" />
                              <path id="Line_8" data-name="Line 8" d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z" />
                              <path id="Line_9" data-name="Line 9" d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cor_ind">
                <ul>
                  <li>
                    <div className="left pointer" >
                      <img src="assets/img/icon/l-p.png"   onClick={()=>{this.Carousel.previous()}}/>
                    </div>
                  </li>
                  <li>
                    <div className="rgt pointer">
                      <img src="assets/img/icon/r-p.png"   onClick={()=>{this.Carousel.next()}}/>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            })
        }
        
        return (
            <div>
                {!homeloading && !productloading ?<React.Fragment>
                <Header 
                    category={listhome.category} 
                    subcategory={listhome.subcategory}
                    subcategoryChild={listhome.subcategoryChild}
                    logoUrl={listhome.setting.logoUrl}
                    headerClass={"fixed-top1"}
                />
            
              
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
          
          {sliderRender}
          </Carousel>
         
         
                <main>
                <section className="solutn_prdect">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="record_prou_det">
                <div className="container">
                  <div className="row">
                   {productContent}
                    <div className="more_product_btn">
                      <Link to={`/shop?subcategoryChildID=${this.state.parsed.subcategoryChildID}&categoryID=${this.state.parsed.categoryID}&slider=${this.state.parsed.slider}`}>SHOP ALL PRODUCTS</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       {/* ======= Cta Section ======= */}
       <section id="cta " className="cta cta-p-al">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 text-center text-lg-left net_logo">
              <img src="/assets/img/Netflix-Logo-1@2x.png" />
            </div>
            <div className="col-lg-4 cta-btn-container text-center"> <a className="cta-btn align-middle" href="#">READ CASE STUDY <i className="fas fa-chevron-right" /></a> </div>
          </div>
        </div>
      </section>
      {/* End Cta Section */}
      <FeatureList
                  featurebgUrl={listhome.setting.featurebgUrl} 
                  featureTitle={listhome.setting.featureTitle} 
                  featurePara={listhome.setting.featurePara} 
                  featureList={listhome.setting.featureList} 
                /> 
        <div className="mt-2">
                {JSON.parse(listhome.setting.hashImageList).length>3 &&  <Hashtag 
                  hashtag={listhome.setting.hashtag} 
                  hashImageList={JSON.parse(listhome.setting.hashImageList)} 
               /> }
        </div>
      
</main>
                <Footer 
                  footerText={listhome.setting.footerText} 
                  contactText={listhome.setting.contactText} 
                  applicationName={listhome.setting.applicationName}
                  applicationEmail={listhome.setting.applicationEmail}
                  contactNo={listhome.setting.contactNo}
                  socialLinksList={JSON.parse(listhome.setting.socialLinksList)}
                  footer1={listhome.footer1}
                  footer2={listhome.footer2}
                />
            </React.Fragment>
                  : <Spinner/>}
            </div>
        )
    }
}
PreProduct.propTypes = {
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    listProduct:PropTypes.object.isRequired,
    listProductSlider:PropTypes.object.isRequired,

}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    home:state.home,
    product:state.product
})
  
export default connect(mapStateToProps,{listProduct,listProductSlider})(withRouter(PreProduct));
