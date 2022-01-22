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






class Landing extends Component {
  
    render() {
      const {listhome,homeloading}=this.props.home;
        return (
          <div class="home">
          {!homeloading ? <React.Fragment>
              <Header 
                category={listhome.category} 
                subcategory={listhome.subcategory}
                subcategoryChild={listhome.subcategoryChild}
                logoUrl={listhome.setting.logoUrl}
                />  
                <HomeSection 
                  homebgUrl={listhome.setting.homebgUrl}
                  homeTitle={listhome.setting.homeTitle} 
                  homePara={listhome.setting.homePara} 
                  homeBtnText={listhome.setting.homeBtnText} 
                  homeBtnPath={listhome.setting.homeBtnPath} 
                /> 
                <main id="main">
                <About 
                 aboutHeading={listhome.setting.aboutHeading}
                 aboutPara={listhome.setting.aboutPara}
                 aboutCoverUrl={listhome.setting.aboutCoverUrl}
                 aboutVideoUrl={listhome.setting.aboutVideoUrl}
                /> 
                 {JSON.parse(listhome.setting.clientList).length>3 &&<Client 
                 client={JSON.parse(listhome.setting.clientList)} 
                 />}
                 <FeatureList 
                  featurebgUrl={listhome.setting.featurebgUrl} 
                  featureTitle={listhome.setting.featureTitle} 
                  featurePara={listhome.setting.featurePara} 
                  featureList={listhome.setting.featureList} 
                /> 
                <Cta 
                  bannerBgUrl={listhome.setting.bannerBgUrl} 
                  bannerText={listhome.setting.bannerText} 
                  bannerPara={listhome.setting.bannerPara} 
                  bannerBtnText={listhome.setting.bannerBtnText} 
                  bannerBtnPath={listhome.setting.bannerBtnPath} 
                  bannerCategory={listhome.catID}
                /> 
                 <CaseStudy 
                  casestudy={listhome.casestudy} 
                  history={this.props.history}
                /> 
               {JSON.parse(listhome.setting.hashImageList).length>3 &&  <Hashtag 
                  hashtag={listhome.setting.hashtag} 
                  hashImageList={JSON.parse(listhome.setting.hashImageList)} 
               /> }
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
Landing.propTypes = {
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  home:state.home
})

export default connect(mapStateToProps,{})(withRouter(Landing));
