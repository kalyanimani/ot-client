import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Spinner from '../common/Spinner';
import {lang} from '../../actions/language';
import { registerUser,loginUser } from '../../actions/authAction';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
const queryString = require('query-string');
class whyacoustic extends Component {
    constructor(props){
        super(props)
        this.state={
            name:"",
            email:"",
            mobile:"",
            password:"",
            password2:"",
            errors:{},
            emailLogin:"",
            passwordLogin:""

        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onSubmitLogin=this.onSubmitLogin.bind(this);

    }
    componentDidMount(){
        
    }
    onChange(e){

        this.setState({[e.target.name]:e.target.value})
    }
    componentWillReceiveProps(nextProps){
       
      }
      
      onSubmit(e){
        e.preventDefault();
        this.setState({errors:{}})
        const userData ={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            password:this.state.password,
            password2:this.state.password2,
        }
        this.props.registerUser(userData);
      }

      onSubmitLogin(e){
        e.preventDefault();
        this.setState({errors:{}})
        const userData ={
            emailLogin:this.state.emailLogin,
            passwordLogin:this.state.passwordLogin,
        }
        this.props.loginUser(userData);
      }
      render() {
        const {errors} =this.state;
        const {listhome,homeloading}=this.props.home;
        return (
            <div>
                 {!homeloading  ?<React.Fragment>
                <Header 
                    category={listhome.category} 
                    subcategory={listhome.subcategory}
                    subcategoryChild={listhome.subcategoryChild}
                    logoUrl={listhome.setting.logoUrl}
                    headerClass={"fixed-top1"}
                /> 
                <div>
                <section className="support">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
              </div>
              <div className="col-lg-9 ">
                <div className="section-title pb-10 lft_alg">
                  <h2>How can we help?</h2>
                  <div className="search_input">
                    <input type="text" name="search" placeholder="SEARCH FOR SUPPORT" />
                    <i className="fa fa-arrow-right" aria-hidden="true" />
                  </div>
                  <div className="check_lst">
                    <ul>
                      <li><a href="#" className="edit_btn check_lst_btn">NEW SUPPORT TICKET </a></li>
                      <li><a href="#" className="edit_btn check_lst_btn">CHECK TICKET STATUS</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="bgstyle_suprt services">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="icon-box icon-box-mobile">
                  <div className="icon icon_w"><img src="assets/img/icon-01.png" /></div>
                  <h4 className="td-w"><a href>ACOUSTICS 101</a></h4>
                  <p className="p-wd">Build an order by selecting room options and calculating coverage and cost.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div className="icon-box icon-box-mobile">
                  <div className="icon icon_w"><img src="assets/img/icon-02.png" /></div>
                  <h4 className="td-w"><a href>CASE STUDIES</a></h4>
                  <p className="p-wd">Work with a product specialist on material selection, design, and project management.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                <div className="icon-box icon-box-mobile">
                  <div className="icon icon_w"><img src="assets/img/icon-03.png" /></div>
                  <h4 className="td-w"><a href>RETURN POLICY</a></h4>
                  <p className="p-wd">A turn-key solution providing project coordination from design to installation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="bgstyle_suprt services p-f">
          <div className="container">
            <h5 className="headind1">EDUCATION &amp; RESOURCES</h5>
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex align-items-stretch">
                <div className="icon-box down_con_box">
                  <h4><a href>GETTING STARTED</a></h4>
                  <p>Build an order by selecting room options and calculating coverage and cost.</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div className="icon-box down_con_box">
                  <h4><a href>FAQ</a></h4>
                  <p>Work with a product specialist on material selection, design, and project management.</p>
                </div>
              </div>  
            </div>
          </div>
        </section>
        <section id="services" className="bgstyle_suprt services p-f">
          <div className="container">
            <div className="space">
              <div className="row">
                <div className="col-lg-6 col-md-6 d-flex align-items-stretch">
                  <div className="icon-box down_con_box">
                    <h4><a href>CUSTOMER SERVICE</a></h4>
                    <p>Build an order by selecting room options and calculating coverage and cost.</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                  <div className="icon-box down_con_box">
                    <h4><a href>PRODUCT SPECIFICATIONS</a></h4>
                    <p>Work with a product specialist on material selection, design, and project management.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
              
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

whyacoustic.propTypes = {
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
whyacoustic.defaultpropTypes={
      slider:[]
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    home:state.home
})
  
export default connect(mapStateToProps,{registerUser,loginUser})(withRouter(whyacoustic));