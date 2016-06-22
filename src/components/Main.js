import React from 'react';
import ImgFigure from './ImgFigure'
import NavUnit from './NavUnit'

var imageData = require('../data/imageDatas.json');

var figures = imageData.map(function (i) {
  i.img = require('../images/'+i.fileName);
  return i;
});


var AppComponent = React.createClass({

  componentDidMount() {

    var stage = this.refs.stage,
      stageW = stage.scrollWidth,
      stageH = stage.scrollHeight,
      halfStageW = Math.ceil(stageW/2),
      halfStageH = Math.ceil(stageH/2);
    stage = {stageW,stageH,halfStageW,halfStageH};

    // var figure = this.refs['imgFigure0'],
    var figure = document.getElementsByClassName('img-figure')[0],
      figureW = figure.scrollWidth,
      figureH = figure.scrollHeight,
      halfFigureW = Math.ceil(figureW/2),
      halfFigureH = Math.ceil(figureH/2);
    figure = {figureW,figureH,halfFigureW,halfFigureH}

    this.props.actions.initial(stage,figure);//初始化布局

  },


  //反转图片
  inverse(index) {
    return function () {
      this.props.actions.inverse(index)
    }.bind(this)
  },

  //居中图片
  center(index) {
    return function () {
      this.props.actions.center(index)
    }.bind(this);
  },

  render() {
    var imgFigures = [];
    var navUnits = [];
    const {gallery} = this.props;
    figures.forEach(function (v, k) {
      if (!gallery.layouts[k])
        gallery.layouts[k] = {
          pos: {top: 0, left: 0},
          rotate: 0,
          inverse: false,
          center: false
        };
      imgFigures.push(<ImgFigure data={v} key={k} layout={gallery.layouts[k]} inverse={this.inverse(k)} center={this.center(k)}/>);
      navUnits.push(<NavUnit key={k} layout={gallery.layouts[k]} inverse={this.inverse(k)} center={this.center(k)}/>)
    }.bind(this));
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {navUnits}
        </nav>
      </section>
    );
  }
});

export default AppComponent;
