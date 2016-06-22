/**
 * Created by fangf on 2016/6/22.
 */
import React from 'react';
var ImgFigure = React.createClass({
  clickFigure: function (e) {
    this.props.layout.center?this.props.inverse():this.props.center();
    e.preventDefault();
    e.stopPropagation();
  },
  render: function () {
    var prefix = ['Moz','ms','Webkit',''];
    var data = this.props.data;
    var layout = {};
    if (this.props.layout.pos) {
      var pos = this.props.layout.pos;
      layout.left = pos.left;
      layout.top = pos.top;
    }
    if (this.props.layout.rotate) {
      var rotate = this.props.layout.rotate;
      prefix.map(function (i) {
        layout[i+'Transform'] = 'rotate(' + rotate + ')';
      })
    }
    if (this.props.layout.center) layout['zIndex'] = 11;
    var className = this.props.layout.inverse?'img-figure img-inverse':'img-figure';
    return(
      <figure className={className} style={layout} onClick={this.clickFigure}>
        <img src={data.img} alt={data.title}/>
        <figcaption>
          <h2 className="img-title">{data.title}</h2>
          <div className="img-back">
            <p>{data.desc}</p>
          </div>
        </figcaption>
      </figure>
    )
  }
});
export default ImgFigure;
