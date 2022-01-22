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

class Client extends Component {
  constructor(props){
    super(props)
    this.state={
        search:""
    }
}

render() {
      const {client}=this.props;
      const {isAuthenticated}=this.props.auth;
      var clientRender=client.map(result=>{
            return <div className="col-lg-2 col-md-4 col-xs-6">
            <div className="client-logo"> <img src={`${IMAGE_URL}${result.url}`} className="img-fluid" alt="" /> </div>
          </div>
      })
        return (
            <section id="clients" className="clients">
            <div className="container">
              <div className="row no-gutters clients-wrap clearfix wow fadeInUp">
                {clientRender}
              </div>
            </div>
          </section>
           )}
}
Client.propTypes = {
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
Client.defaultProps={
    client:[]
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  cart:state.cart,
  wishlist:state.wishlist,
})

export default connect(mapStateToProps,{})(withRouter(Client));
