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
import {IMAGE_URL} from '../../actions/constant';

class HomeSection extends Component {
  constructor(props){
    super(props)
    this.state={
        search:""
    }
}

render() {
      const {homebgUrl,homeTitle,homePara,homeBtnText,homeBtnPath}=this.props;
      const {isAuthenticated}=this.props.auth;
        return (
          <section id="hero" className="d-flex flex-column justify-content-center" style={{backgroundImage:`url(${IMAGE_URL}${homebgUrl})`}}>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-12">
                    <h1>{homeTitle}</h1>
                    <p>{homePara}</p>
                    <Link className="btn-str" to={homeBtnPath}>{homeBtnText}</Link></div>
                  </div>
                </div>
                <div class="spinner scroll-down"> <a class="animate"></a> </div>
          </section>
           )}
}
HomeSection.propTypes = {
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
HomeSection.defaultProps={
    homebgUrl:'',
    homeTitle:'',
    homePara:'',
    homeBtnText:'',
    homeBtnPath:'',
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  cart:state.cart,
  wishlist:state.wishlist,
})

export default connect(mapStateToProps,{})(withRouter(HomeSection));
