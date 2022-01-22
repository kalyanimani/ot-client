import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { IMAGE_URL } from '../../actions/constant';
import  Modal  from 'react-responsive-modal';

class About extends Component {
  constructor(props){
    super(props)
    this.state={
        search:"",
        modalOpen:false
    }
}

render() {
      const {aboutHeading,aboutPara,aboutCoverUrl,aboutVideoUrl}=this.props;
      const {isAuthenticated}=this.props.auth;
        return (
          <section id="about" className="about">
              <Modal open={this.state.modalOpen} onClose={()=>this.setState({modalOpen:false})} center>
              <iframe id="player" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com" frameborder="0" style={{paddingTop:20,paddingBottom:20}}></iframe>
            </Modal>
          <div className="container">
            <div className="row content">
              <div className="col-lg-6 col-md-6 col-12">
                <h2>{aboutHeading}</h2>
                <p> {aboutPara}</p>
              </div>
              <div className="col-lg-6 col-md-6 col-12 pt-4 pt-lg-0">
                <div className="video_bg"> <img src={`${IMAGE_URL}${aboutCoverUrl}`} /> <span onClick={()=>this.setState({modalOpen:true})} className="venobox play-btn mb-4 pointer" data-vbtype="video" data-autoplay="true" ></span> </div>
              </div>
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
  aboutHeading:'',
  aboutPara:'',
  aboutCoverUrl:'',
  aboutVideoUrl:''
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  cart:state.cart,
  wishlist:state.wishlist,
})

export default connect(mapStateToProps,{})(withRouter(About));
