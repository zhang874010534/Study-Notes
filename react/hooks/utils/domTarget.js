import {isFunction} from "./index.js";
import isBrowser from "./isBrowser";
export function getTargetElement (target, defaultElement) {
  if(!isBrowser) {
    return undefined
  }

  if(!target) {
    return defaultElement
  }

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
