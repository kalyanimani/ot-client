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
      const {bannerBgUrl,bannerText,bannerPara,bannerBtnText,bannerBtnPath,bannerCategory}=this.props;
      const {isAuthenticated}=this.props.auth;
        return (
          <section id="cta" class="cta" style={{background:`linear-gradient(90deg, rgba(198,5,108,0.6138830532212884) 0%, rgba(0,138,243,0.5074404761904762) 100%), url(${IMAGE_URL}${bannerBgUrl}) fixed center center`}}>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 text-center text-lg-left">
                  <h3>{bannerText}</h3>
                  <p> {bannerPara}</p>
                </div>
                <div class="col-lg-4 cta-btn-container text-center"> <Link class="cta-btn align-middle" to={`/shop?categoryID=${bannerCategory._id}&quickship=Yes&slider=1`}>{bannerBtnText} <i class="fas fa-chevron-right"></i></Link> </div>
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
  bannerBgUrl:'',
  bannerText:'',
  bannerPara:'',
  bannerBtnText:'',
  bannerBtnPath:''
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  cart:state.cart,
  wishlist:state.wishlist,
})

export default connect(mapStateToProps,{})(withRouter(About));
