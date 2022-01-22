import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Header from '../layouts/Header';
import CaseStudy from '../layouts/CaseStudy';
import Footer from '../layouts/Footer';
import Spinner from '../common/Spinner';
import Slider from './Slider';
import Slider1 from './Slider1';
import LeftMenu from './LeftMenu';
import ProductCard from './ProductCard';
import AdCard from './AdCard';
import {listProduct,listProductSlider} from'../../actions/productAction';
import {lang} from '../../actions/language';
const queryString = require('query-string');

class Product extends Component {
    constructor(props){
        super(props)
        this.state={
            parsed:queryString.parse(this.props.location.search),
            category:[],
            search:"",
            
        }
        this.scrollDiv = React.createRef();
        this.onSearch=this.onSearch.bind(this);
    }

    componentDidMount(){
        this.getProduct();
      
    }

    scrollToMyRef = () => window.scrollTo(20, this.myRef.current.offsetTop)   

    handleChange(event) {
        event.preventDefault();
        const {parsed} = this.state;
        this.props.history.push(`/shop?categoryID=${parsed.categoryID}&search=${this.state.search}&slider=${parsed.slider}`)
      
    }
    getProduct(){
       
        const parsed = this.state.parsed;
        if(parsed.categoryID && !parsed.subcategoryChildID  && !parsed.subcategoryID && !parsed.search){
            this.props.listProduct({categoryID:parsed.categoryID})
            this.props.listProductSlider({categoryID:parsed.categoryID});
        }else if(parsed.categoryID && parsed.subcategoryChildID){
          this.props.listProduct({subcategoryChildID:parsed.subcategoryChildID})
         this.props.listProductSlider({categoryID:parsed.categoryID});
        }else if(parsed.categoryID && parsed.subcategoryID){
           
            this.props.listProduct({subcategoryID:parsed.subcategoryID})
           this.props.listProductSlider({categoryID:parsed.categoryID});
        }
        else if(parsed.search){
            console.log("search")
            this.props.listProduct({search:parsed.search})
        }

        if(parsed.categoryID){
            this.props.listProductSlider({categoryID:parsed.categoryID});
        }
        if(parsed.quickship){
           
            this.handleClickQuick()
        }
    }

    onSearch(e){
        e.preventDefault();
        if(this.state.search !=""){
          this.props.history.push(`/shop?search=${this.state.search}`)
        }else{
          this.props.history.push(`/shop`)
        }
       
      }

    componentDidUpdate (prevProps) {
        console.log("new page called")
        
        if (prevProps.location.key !== this.props.location.key) {
          window.scrollTo(0,0)
          this.setState({
              parsed:queryString.parse(this.props.location.search)
          },()=>{
              if(this.state.parsed.showproduct==="1"){
                console.log("new page called 12")
                this.scrollDiv.current.scrollIntoView({ behavior: 'smooth' });
              }
            this.getProduct()
          })
          
        }
    }

    handleClickQuick = () => {
        this.props.listProduct({quickship:"Yes"})
      }

    render() {
        const {listhome,homeloading}=this.props.home;
        const {parsed} = this.state;
        const {listproduct,productloading,productslider}=this.props.product;
        var productContent=[];
        if(listproduct !=null && Object.keys(listproduct).length >0){
       
            listproduct.map((result,index)=>{
                if(index >=1 && index  ===3){
                    productContent.push(
                        <AdCard history={this.props.history} product={listproduct} parsed={parsed}/>
                    )
                }
                productContent.push (<ProductCard  product={result} parsed={parsed}/> )
            })
        }
        return (
            <div>
                {!homeloading && !productloading ?<React.Fragment>
                <Header 
                    category={listhome.category} 
                    subcategory={listhome.subcategory}
                    subcategoryChild={listhome.subcategoryChild}
                    logoUrl={listhome.setting.logoUrl}
                    headerClass={"fixed-top1"}
                />
                <main>

                
                {(productslider !=null &&productslider.slider.length >0) && parsed.slider==="1" &&
                <Slider 
                slider={productslider.slider} 
                />}
                {(productslider !=null &&productslider.slider.length >0)&& parsed.slider==="2" &&<Slider1 slider={productslider.slider} parsed={parsed}/>}

                {/* Component Code Start */}
                <div className="market-list" >
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3 sidebar">
                                <form className="form-inline" onSubmit={(e)=>this.handleChange(e)}>
                                    <input name="search"  onChange={(e)=>this.setState({
                                        search:e.target.value
                                    })}  value={this.state.search} className="searchbox" type="search" placeholder={lang.search} aria-label="Search" />
                                </form>
                                    {/* <input className="searchbox" type="text"  name="s" placeholder="Search for" id="s" /> */}
                                    {(productslider !=null &&productslider.category.length >0) &&  <LeftMenu 
                                     label={"Collection"} 
                                     type={"category"} 
                                     category={productslider.category}
                                     handleClickQuick={this.handleClickQuick}
                                     quickShip={true}

                                     />}
                                    {(productslider !=null &&productslider.category.length >0) && parsed.slider==="1" && <LeftMenu 
                                    label={"Solution"} 
                                    type={"other"} 
                                    quickShip={false}
                                    category={productslider.other}/>}
                                </div>
                                <div className="col-md-9"  ref={this.scrollDiv}>
                                    <div className="sug_pro">
                                        <div className="container">
                                            <div className="row">
                                                {productContent}
                                                

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
      {/* Component Code END */}
      {parsed.slider==="1" &&<CaseStudy 
                  casestudy={listhome.casestudy} 
                  history={this.props.history}
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
            </React.Fragment>
                  : <Spinner/>}
            </div>
        )
    }
}
Product.propTypes = {
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    listProduct:PropTypes.object.isRequired,
    listProductSlider:PropTypes.object.isRequired,

}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    home:state.home,
    product:state.product
})
  
export default connect(mapStateToProps,{listProduct,listProductSlider})(withRouter(Product));
