import React, { Component } from 'react'
import Currency from '../common/Currency';
import { IMAGE_URL } from '../../actions/constant';

export default class AdCard extends Component {
    constructor (props) {
		super(props);
		
		this.state = {
            currentImageIndex: 0,
            product:[]
		};
		
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
    }
    componentDidMount(){
        this.setState({
            product:this.props.product
        })
    }
   
	
	previousSlide () {
		const lastIndex = this.state.product.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === 0;
		const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;
		
		this.setState({
			currentImageIndex: index
		});
	}
	
	nextSlide () {
		const lastIndex = this.state.product.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === lastIndex;
		const index =  shouldResetIndex ? 0 : currentImageIndex + 1;

		this.setState({
			currentImageIndex: index
		});
    }
    
    onClickShop(id){
        this.props.history.push(`/productdetail?productID=${id}&slider=${this.props.parsed.slider}`)
    }
    render () {
        console.log("this.state.product",this.state.product)
		return (
			<React.Fragment>
                 {this.state.product.length>0 ? <div className="li-product-spl col-md-8">
                <div className="content_sug">
                  <h2>{this.state.product[this.state.currentImageIndex].name}</h2>
                  <p>{this.state.product[this.state.currentImageIndex].description.length>80?this.state.product[this.state.currentImageIndex].description.substring(0, 77) + "..." : this.state.product[this.state.currentImageIndex].description}</p>
                  <div className="price"> <span>{this.state.product[this.state.currentImageIndex].price} <Currency/></span> <span className="pointer" style={{zIndex:9999}} onClick={()=>this.onClickShop(this.state.product[this.state.currentImageIndex]._id)}>Shop now</span> </div>
                </div>
                <div className="content_sug_img">
                <img src={`${IMAGE_URL}${this.state.product[this.state.currentImageIndex].photoUrl1}`} style={{width:268,height:218}}/> 
                  </div>
                  
               
                <div className="row" style={{width:"100%",position:'absolute',bottom:-5,paddingLeft:20,paddingRight:20,justifyContent:"normal"}}>
                    <Arrow direction="left" clickFunction={ this.previousSlide } glyph="&#9664;" /> 
                    <Arrow direction="right" clickFunction={ this.nextSlide } glyph="&#9654;" /> 
                </div>
                
            </div>:null}
                 
            </React.Fragment>
               
               
				
			
		);
	}
}

const Arrow = ({ direction, clickFunction, glyph }) => (
	<div 
		className={ `slide-arrow ${direction} p-2` } 
		onClick={ clickFunction }>
		{ glyph } 
	</div>
);

const truncate = ({str, n}) =>{
    return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
  };

const ProductSlide = ({ data }) => {
	

	return (
        <div className="li-product-spl col-md-8">
        <div>
          <h2>{data.name}</h2>
          <p>{data.description}</p>
          <div className="price"> <span>{data.price} <Currency/></span> <span>Shop now</span> </div>
        </div>
        <img src="assets/img/market-product2.jpg" /> 
         <Arrow direction="left" clickFunction={ this.previousSlide } glyph="&#9664;" /> 
		 <Arrow direction="right" clickFunction={ this.nextSlide } glyph="&#9654;" /> 
    </div>
	);
}

AdCard.defaultProps={
    product:[]
}