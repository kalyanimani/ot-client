import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

class Currency extends Component {

render() {
      const {listhome,homeloading}=this.props.home;
        if(homeloading){
          return null
        }
        const {currency}=listhome.setting;
         return (
            <span>{currency}</span>
           )}
}

const mapStateToProps = (state) => ({
  home:state.home
})

export default connect(mapStateToProps,{})(withRouter(Currency));
