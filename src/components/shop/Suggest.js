import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Axios from 'axios';
import {IMAGE_URL,API_URL,} from '../../actions/constant';

class Suggest extends Component {
        constructor(props){
            super(props);
            this.state={
                suggested:[],
            }
        }
    componentDidMount(){
        const {cart}=this.props;
        let result = cart.map(a => a.categoryID);
        if(result.length===0)
        return;
        console.log("result",result)
        Axios.post(API_URL+"/api/product/suggested",{categoryIDS:result})
        .then(result=>{
            this.setState({
                suggested:result.data
            })
        })
        .catch(err=>{
            this.setState({
                suggested:[]
            })
        })
    }
    render() {
        const {suggested}=this.state;
        return (
            <div>
                     {suggested.length>0 &&<div className="sug_pro">
                                <div className="container">
                                <h2>SUGGESTED PRODUCTS</h2>
                                <div className="row">
                                   {suggested.map(result=>{
                                       return <Link to={`/productdetail?productID=${result._id}&slider=1`} className="col-md-3"> 
                                       <img src={`${IMAGE_URL}${result.photoUrl1}`} class="img-responsive"/>
                                       <p className="p-2 text-center">{result.name}</p>
                                       </Link>
                                   })} 
                                    
                                </div>
                                </div>
                            </div>}
            </div>
        
        )
    }
}
Suggest.propTypes = {
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
}

  
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    cart:state.cart,
})
  
export default connect(mapStateToProps,{})(withRouter(Suggest));