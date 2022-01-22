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
class Faq extends Component {
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
                 <section>
                   <Accordion>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    What's the difference between Soundproofing and Acoustic Treatment?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    There are many ways to soundproof a room; to prevent sound from traveling from one room to another, you need to work with products that block noise from traveling through the drywall or wall studs. Some products you might want to look into are Sound Barrier, Green Glue, and Resilient Isolation Clips.
                    <br/>  Related Article: What's the difference between Soundproofing and Acoustic Treatment?

                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Which products are right for my application?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    Every space is unique and completely dependent on what success sounds like to your listeners.
         <br/>  <br/>Overtone has solutions available for many different applications, including Pro Audio , Residential , Commercial and Institutional .
         <br/>  <br/> If you'd like assistance determining the best solution for your space, our team of acoustic experts are here to help! Get started today with a Free Room Analysis.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>


            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    How do I install my product?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    If you have questions about the best installation practices or would like to inquire about having your products installed, please contact support@overtoneacoustics.com
                               </p>
                </AccordionItemPanel>
            </AccordionItem>


            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Where can I find Overtone Acoustics product technical data?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    All of our Products Technical Data sheets can be found below:
          <br/>
          <br/>
                    <a title="1.5" overtone="" acoustic="" panel="" href="https://www.dropbox.com/s/xehj3c79ajzrs95/Overtone_Acoustic-Panel_SpecSheet.pdf?dl=0">1.5" Overtone Acoustic Panel</a>
                    <br/>

                    <a title="4" overtone="" bass="" trap="" href="https://www.dropbox.com/s/n0ssixlc99oyyln/OA_BASS-TRAP_TDS.pdf?dl=0">4" Overtone Bass Trap</a>
                    <br/>
                    <br/>
                    If you require more information, please contact sales@overtoneacoustics.com.
                               </p>
                </AccordionItemPanel>
            </AccordionItem>


           
        </Accordion>
        </section>
              
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

Faq.propTypes = {
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
Faq.defaultpropTypes={
      slider:[]
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    home:state.home
})
  
export default connect(mapStateToProps,{registerUser,loginUser})(withRouter(Faq));