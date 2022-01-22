import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Header from './Header';
import HomeSection from './HomeSection';
import About from './About';
import Client from './Client';
import FeatureList from './FeatureList';
import Cta from './Cta';
import CaseStudy from './CaseStudy';
import Hashtag from './Hashtag';
import Footer from './Footer';
import Spinner from '../common/Spinner';
import {IMAGE_URL} from '../../actions/constant';






class CaseStudyDetail extends Component {
  constructor(props){
      super(props)
      this.state={
          detailContent:{}
      }
  }
  componentDidMount(){
      if(localStorage.blogdetail){
          this.setState({
            detailContent:JSON.parse(localStorage.blogdetail)
          })
      }else{
          this.props.history.push("/")      }
  }
    render() {
      const {listhome,homeloading}=this.props.home;
      const {detailContent} = this.state;
        return (
          <div class="home">
          {!homeloading ? <React.Fragment>
              <Header 
                category={listhome.category} 
                subcategory={listhome.subcategory}
                subcategoryChild={listhome.subcategoryChild}
                logoUrl={listhome.setting.logoUrl}
                />  
               
                <main id="main">
                <section className="new-carosel">
       
          {/* Indicators */}
          {/* Wrapper for slides */}
          <div className="carousel-inner">
            <div className="item active">
              <img src={`${IMAGE_URL}${detailContent.photoUrl}`}  alt="Los Angeles" style={{width: '100%'}} />
            </div>
         </div>
         
        
      </section>
      <div className="milwaukee_column">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>{detailContent.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: detailContent.content }} />
            </div>
          </div>
        </div>
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
              </React.Fragment>  : <Spinner/>}
        </div>
        )
    }
}
CaseStudyDetail.propTypes = {
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  home:state.home
})

export default connect(mapStateToProps,{})(withRouter(CaseStudyDetail));
