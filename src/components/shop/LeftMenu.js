import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class LeftMenu extends Component {

  

    render() {
      const {category,type,label,quickShip} = this.props;
      var categoryRender=category.map((result,index)=>{
        var products=result.products;
       var productRender= products.map(res=>{
          return <li><Link to={`/productdetail?productID=${res._id}`}>{res.name}</Link></li>
        })
        return <React.Fragment>
          <div className="card-header collapsed" data-toggle="collapse" href={`#collapse${index}${type}`}>
                  <a className="card-title">{result.subCategoryName}</a>
                </div>
                <div id={`collapse${index}${type}`} className="card-body collapse" data-parent="#accordion">
                  <ul>
                    {productRender}
                   
                  </ul>
                </div>
          </React.Fragment>
      })
      
        return (
            <div className="menu">
            <h3>VIEW BY {label}</h3>
            <div id="accordion" className="accordion">
              <div className="card mb-0">
                {categoryRender}
                {/* //{quickShip && <li><button onClick={this.props.handleClickQuick} class="btn btn-link">Quick Ship</button></li>} */}
                {quickShip &&  <div className="card-header1">
                  <a className="card-title" onClick={this.props.handleClickQuick}>Quick Ship</a>
                </div>}
             
              </div>
            </div>
          </div>
        )
    }
}
LeftMenu.defaultProps={
  category:[],
  label:"Category"
}