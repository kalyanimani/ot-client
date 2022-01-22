import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {withRouter,Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { IMAGE_URL } from '../../actions/constant';

class ProductCard extends Component {
    render() {
        const  {product,parsed}=this.props;
       
        return (
            <div class="li-product col-md-4 mr-l-0">
 {product &&<Link to={`/productdetail?productID=${product._id}&slider=${parsed.slider}`} > 
               
    <img src={`${IMAGE_URL}${product.photoUrl1}`} />
                <p>{product.name}</p>

      
            </Link>}

           
            </div>
           
        )
    }
}
ProductCard.propTypes = {
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
  }
ProductCard.defaultProps={
      product:{},
      className:"li-product col-md-4 mr-l-0"
}
  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    cart:state.cart,
    wishlist:state.wishlist,
})
  
export default connect(mapStateToProps,{})(withRouter(ProductCard));
