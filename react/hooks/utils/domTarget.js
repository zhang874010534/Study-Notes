import {isFunction} from "./index.js";

export function getTargetElement (target) {
  let targetElement

  if(isFunction(target)) {
    targetElement = target()
  }else if('current' in target) {
    targetElement = target.current
  } else {
    targetElement = target
  }
  return targetElement
}
