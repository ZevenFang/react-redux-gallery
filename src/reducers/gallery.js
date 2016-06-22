/**
 * Created by fangf on 2016/6/22.
 */
import * as Types from '../actions/const';

const initialState = {
  constant: {
    centerPos: {left: 0, right: 0},
    hPosRange: { //水平方向的取值范围
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: { //垂直方向的取值范围
      x: [0, 0],
      topY: [0, 0]
    }
  },
  layouts: []
};

function getRandomRange(range) { //随机位置
  return Math.ceil(Math.random() * (range[1] - range[0]) + range[0]) + 'px';
}

function getRandomDeg() { //随机角度
  return Math.ceil(Math.random() * 60 - 30) + 'deg';
}

function layout(state,id) {
  var layouts = state.layouts;
  var constant = state.constant;

  //布局中间图片
  var centerFigures = layouts.splice(id,1);
  centerFigures[id] = {
    pos: constant.centerPos,
    rotate: 0,
    inverse: false,
    center: true
  };

  //布局上侧图片
  var topNum = Math.ceil(Math.random()*2),//0~1张图片
    topFigureIndex = Math.ceil(Math.random() * (layouts.length - topNum)),
    topFigures = layouts.splice(topFigureIndex, topNum);
  topFigures.forEach(function (value, key) {
    topFigures[key].pos = {
      top: getRandomRange(constant.vPosRange.topY),
      left: getRandomRange(constant.vPosRange.x)
    };
    topFigures[key].rotate = getRandomDeg();
    topFigures[key].center = false;
  }.bind(this));

  //布局左右两侧图片
  for (var i=0, j = layouts.length, k = j/2; i<j; i++){
    var range  = i < k ? constant.hPosRange.leftSecX : constant.hPosRange.rightSecX;
    layouts[i].pos = {
      top: getRandomRange(constant.hPosRange.y),
      left: getRandomRange(range)
    };
    layouts[i].rotate = getRandomDeg();
    layouts[i].center = false;
  }
  if (topFigures && topFigures[0])
    layouts.splice(topFigureIndex,0,topFigures[0]);
  layouts.splice(id,0,centerFigures[id]);

  return layouts;
}

export default function gallery(state = initialState, action) {
  switch (action.type){
    case Types.INITIAL://初始化布局
      const {stageW,stageH,halfStageW,halfStageH} = action.stage;
      const {figureW,halfFigureW,halfFigureH} = action.figure;
      var constant = state.constant;
      constant.centerPos = {
        left: halfStageW - halfFigureW + 'px',
        top: halfStageH - halfFigureH + 'px'
      };

      constant.hPosRange.leftSecX[0] = -halfFigureW;
      constant.hPosRange.leftSecX[1] = halfStageW - halfFigureW * 3;
      constant.hPosRange.rightSecX[0] = halfStageW + halfFigureW;
      constant.hPosRange.rightSecX[1] = stageW - halfFigureW;
      constant.hPosRange.y[0] = - halfFigureH;
      constant.hPosRange.y[1] = stageH - halfFigureH;

      constant.vPosRange.topY[0] = -halfFigureH;
      constant.vPosRange.topY[1] = halfStageH - halfFigureH * 3;
      constant.vPosRange.x[0] = halfStageW - figureW;
      constant.vPosRange.x[1] = halfStageW;

      state.constant = constant;
      state.layouts = layout(state,0); //重新布局并居中第一张图片
      return Object.assign({},state);

    case Types.CENTER://选取图片
      state.layouts = layout(state,action.id);
      return Object.assign({},state);

    case Types.INVERSE://反转图片
      var layouts = state.layouts;
      layouts[action.id].inverse = !layouts[action.id].inverse;
      return Object.assign({},state);

    default:
      return state;
  }
}
