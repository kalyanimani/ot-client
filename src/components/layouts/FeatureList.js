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

class About extends Component {
  constructor(props){
    super(props)
    this.state={
        search:""
    }
}

render() {
      const {featurebgUrl,featureTitle,featurePara,featureList}=this.props;
      const {isAuthenticated}=this.props.auth;
      var featureData=JSON.parse(featureList);
      var featureRender=featureData.map(result=>{
        return  <div className="col-lg-4 col-md-6 d-flex align-items-stretch pointer" >
        <div className="icon-box">
          <div className="icon"><img src={`${IMAGE_URL}${result.url}`} /></div>
          <h4>{result.title}</h4>
          <p>{result.para}</p>
        </div>
      </div>
      })
     
        return (
          <section id="services" className="services" style={{backgroundImage:`url(${IMAGE_URL}${featurebgUrl})`}}>
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h2>{featureTitle}</h2>
              <p>{featurePara}</p>
            </div>
            {featureRender}
           
          </div>
        </div>
      </section>
           )}
}
About.propTypes = {
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
About.defaultProps={
    featurebgUrl:'',
    featureTitle:'',
    featurePara:'',
    featureList:[]
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  cart:state.cart,
  wishlist:state.wishlist,
})

export default connect(mapStateToProps,{})(withRouter(About));
