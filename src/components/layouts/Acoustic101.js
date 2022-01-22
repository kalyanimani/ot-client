import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Spinner from '../common/Spinner';
import {lang} from '../../actions/language';
import { registerUser,loginUser } from '../../actions/authAction';

const queryString = require('query-string');
class Acoustic101 extends Component {
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
                <div className="prv_btn">
                  <ul>
                    <li><i className="fa fa-arrow-left" aria-hidden="true" /></li>
                    <li><a href="#">Previous page</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="section-title lft_alg">
                  <h2>How can we help?</h2>
                  <div className="search_input">
                    <input type="text" name="search" placeholder="SEARCH FOR SUPPORT" />
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
        <section className="suprt_main_con">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 bg_styl">
                <div className="suprt_sub_con_fst">
                  <h2>ACOUSTICS 101</h2>
                  <p>Overtone Acoustics exists where performance and style intersect, bringing robust acoustic treatments and soundproofing solutions together with an array of acoustic art collections to set your room apart from any other. While you can learn more about who we are at your convenience, we’d like to take the opportunity to establish a framework of knowledge for anyone who is interested in learning more about acoustic treatments and soundproofing.</p>
                  <p> Whether you are in-market for acoustic panels and bass traps for your new studio or are simply looking to educate yourself on the world of professional-quality acoustical solutions, we’ve got you covered. Let’s dive into Acoustics 101.</p>
                </div>
                <div className="suprt_sub_con">
                  <h2>WHY SHOULD YOU CARE?</h2>
                  <p>By definition, musicians of every kind work with sound, yet it’s also true that the majority of musicians only have a surface-level understanding of it. Gaining a working knowledge of the mechanism of sound helps anyone who works with studio equipment and music software, along with musicians themselves. This is because the setting in which you create sound can dramatically alter its quality; a sound engineer worth their salt understands the importance of working in a room that has been acoustically designed. In no uncertain terms, the way a sound engineer relates to the sonic environment that they are recording in can make or break the quality of a recording. An acoustically optimized environment will supplement in sharpening the output.</p>
                </div>
                <div className="suprt_sub_con">
                  <h2>THE BASICS OF SOUND</h2>
                  <p>Before we get too far ahead of ourselves talking about acoustically optimized recording studios and such, let’s discuss the basics of sound itself. </p>
                  <p>Sounds are made up of slight changes in air pressure that the eardrum is sensitive to. The eardrum will move back and forth due to the air being pushed into it, creating a vibrating motion. This motion is transmitted through the bone chain to the inner ear, where the signal disturbs the liquid found there. This is where auditory nerves come into play and the brain takes over, making sense of the whole thing.</p>
                  <p>There are three ways to differentiate sounds: pitch (frequency), loudness, and quality (vocal tract shape). While we don’t have time to break down each of these categories, it’s vital to know that each of them is independent of one another. A slight change to any of these differentiators will dramatically affect a sound.</p>
                </div>
                <div className="suprt_sub_con">
                  <h2>ROOM ACOUSTICS</h2>
                  <p>We’ve touched on the fundamentals above, but there is another variable in the equation that many forget to include — the environment in which the sound is heard. Your room plays a huge role in the quality of output you hear from your sound system, just like the room acoustics of a recording studio or even a live performance venue can make or break the end result. You can have the cream of the crop in terms of instruments, recording equipment, and musicians — but if your recording/performance room has low-quality acoustics, the results are going to suffer.</p>
                </div>
                <div className="suprt_sub_con">
                  <h2>FIND A BALANCE</h2>
                  <p>You need to find a balance between an overly “live room” and a “dead room.” A live room is one that typically has too many hard surfaces (think glass windows, hardwood floor, cement), which tend to bounce sound back from where it came. Everything sounds muddy — and will drive a lot of people in our industry absolutely nuts. This is why high school auditoriums or gyms seldom make high-quality listening venues.
                  </p>
                  <p> Conversely, dead rooms can be found anywhere there’s a room that’s overly dampened. Think of how it sounds when there is snow outside — everything gets absorbed. If a room in question has an excess of thick carpeting, dense furniture, and draperies, things get too muffled. </p>
                  <p>The key is to find a room that offers an organic, rich balance of sound across a spectrum of frequencies. Browse our other resources to learn how achieving this goal is possible.</p>
                </div>
                <div className="suprt_sub_con">
                  <h2>WHY OVERTONE ACOUSTICS?</h2>
                  <p>In our experience, we most commonly deal with overly live rooms, but we are able to provide solutions to a wide range of issues. Overtone Acoustics provides acoustic panels, acoustic art panels, bass traps, acoustic baffles, acoustic ceiling clouds, acoustic ceiling tiles for acoustic solutions big and small. For acoustic wall panels that blend performance with sound absorbing artwork, Overtone Acoustics is your solution.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="bgstyle_suprt services">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="icon-box">
                  <div className="icon icon_w"><img src="assets/img/icon-01.png" /></div>
                  <h4 className="td-w"><a href>QUICK START</a></h4>
                  <p className="p-wd">Build an order by selecting room options and calculating coverage and cost.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div className="icon-box">
                  <div className="icon icon_w"><img src="assets/img/icon-02.png" /></div>
                  <h4 className="td-w"><a href>PROJECT BUILDER</a></h4>
                  <p className="p-wd">Work with a product specialist on material selection, design, and project management.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                <div className="icon-box">
                  <div className="icon icon_w"><img src="assets/img/icon-03.png" /></div>
                  <h4 className="td-w"><a href>CUSTOM DESIGN</a></h4>
                  <p className="p-wd">A turn-key solution providing project coordination from design to installation.</p>
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

Acoustic101.propTypes = {
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
Acoustic101.defaultpropTypes={
      slider:[]
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    home:state.home
})
  
export default connect(mapStateToProps,{registerUser,loginUser})(withRouter(Acoustic101));