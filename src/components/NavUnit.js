/**
 * Created by fangf on 2016/6/22.
 */
import React from 'react';

var NavUnit = React.createClass({
  clickUnit: function (e) {
    this.props.layout.center?this.props.inverse():this.props.center();
    e.preventDefault();
    e.stopPropagation();
  },
  render(){
    var className = 'controller-unit';
    className += this.props.layout.center?' is-center':'';
    className += this.props.layout.inverse?' is-inverse':'';
    return <span className={className} onClick={this.clickUnit}/>
  }
});
export default NavUnit;
