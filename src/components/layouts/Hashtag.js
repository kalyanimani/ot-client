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

class Hashtag extends Component {
  constructor(props){
    super(props)
    this.state={
        search:""
    }
}

render() {
      const {hashtag,hashImageList}=this.props;
      const {isAuthenticated}=this.props.auth;
      var hashRender=hashImageList.map(result=>{
        return <div className="col-lg-2 col-md-2">
        <div className="box"> <img src={`${IMAGE_URL}${result.url}`} /> </div>
      </div>
      })
        return (
            <section id="insta" className="insta">
            <div className="container-fluid">
              <div className="section-title">
                <h2>{hashtag}</h2>
              </div>
              <div className="row">
                {hashRender}
              </div>
            </div>
          </section>
           )}
}
Hashtag.propTypes = {
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
Hashtag.defaultProps={
  hashtag:'',
  hashImageList:[]
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  cart:state.cart,
  wishlist:state.wishlist,
})

export default connect(mapStateToProps,{})(withRouter(Hashtag));
