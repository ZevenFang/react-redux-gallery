/**
 * Created by fangf on 2016/6/22.
 */
import * as Types from './const';

export function initial(stage,figure) {
  return {
    type:Types.INITIAL,
    stage,
    figure
  }
}

export function center(id) {
  return {
    type:Types.CENTER,
    id
  }
}

export function inverse(id) {
  return {
    type:Types.INVERSE,
    id
  }
}
