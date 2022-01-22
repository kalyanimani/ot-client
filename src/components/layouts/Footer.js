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

class Footer extends Component {
  constructor(props){
    super(props)
    this.state={
        search:""
    }
}

render() {
      const {
        footerText,
        contactText,
        applicationName,
        applicationEmail,
        contactNo,
        socialLinksList,
        footer1,
        footer2
      }=this.props;
      const {isAuthenticated}=this.props.auth;
     

      var socialRender=socialLinksList.map(result=>{
        return  <li><a href={result.url} target="_blank"><i className={result.icon}></i></a></li>
      })
      var footer1Content=footer1.map(result=>{
            return  <li><Link to={`/shop?subcategoryID=${result._id}&categoryID=${result.categoryID}&slider=1`}>{result.subCategoryName}</Link></li>
      })

      var footer2Content=footer2.map(result=>{
        return  <li><Link to={`/shop?subcategoryID=${result._id}&categoryID=${result.categoryID}&slider=2`}>{result.subCategoryName}</Link></li>
      })

        return (
          <footer id="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="CTA">
                  <h2>{footerText}</h2>
                  <Link to="/shop">START HERE <i className="fas fa-chevron-right" /></Link> </div>
              </div>
              <div className="col-lg-6">
                <div className="q_links">
                  <div className="row">
                    <div className="col-lg-4">
                      <h4>Shop</h4>
                      <ul>
                       {footer1Content}
                      </ul>
                    </div>
                    <div className="col-lg-4">
                      <h4>Solutions</h4>
                      <ul>
                        {footer2Content}
                      </ul>
                    </div>
                    <div className="col-lg-4">
                      <h4>About</h4>
                      <ul>
                        <li><Link to="/whyovertone">Why Overtone? </Link></li>
                        <li><Link to="/acoustic101">Acoustics 101 </Link></li>
                        <li><Link to="/support">Support</Link></li>
                        <li><Link to="/faq">FAQ </Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="contact">
                  <h4>Contact</h4>
                  <p>{contactText}</p>
                  <ul>
                    <li><a href="#">{contactNo}</a></li>
                    <li><a href="#">{applicationEmail}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="copyrights">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 copy">
                  <p>© {new Date().getFullYear()} {applicationName} All rights reserved.</p>
                </div>

                
                <div className="col-lg-6 social">
                  <ul>
                  {socialLinksList.length>1 && socialRender}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
           )}
}
Footer.propTypes = {
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
Footer.defaultProps={
  footerText:'',
  contactText:'',
  applicationName:'',
  applicationEmail:'',
  contactNo:'',
  socialLinksList:[],
  footer1:[],
  footer2:[]
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  cart:state.cart,
  wishlist:state.wishlist,
})

export default connect(mapStateToProps,{})(withRouter(Footer));
