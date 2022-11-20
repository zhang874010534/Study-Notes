import {useEffect, useMemo, useRef, useState} from "react";
import {useEventListener} from "ahooks";
import {getTargetElement} from "../utils/domTarget";
import useLatest from "../useLatest";
import {isNumber} from "../utils";

const useVirtualList =  (list, options) => {
  const { containerTarget, wrapperTarget, itemHeight, overscan = 5 } = options;
  const itemHeightRef = useLatest(itemHeight);
  // const size = useSize(containerTarget);
  // 如果是直接跳转，则不需要重新计算
  const scrollTriggerByScrollToFunc = useRef(false);

  const [targetList, setTargetList] = useState([]);
  const getVisibleCount = (containerHeight, fromIndex) => {
    if (isNumber(itemHeightRef.current)) {
      return Math.ceil(containerHeight / itemHeightRef.current);
    }
    // 这里不知道为什么
    let sum = 0;
    let endIndex = 0;
    for (let i = fromIndex; i < list.length; i++) {
      const height = itemHeightRef.current(i, list[i]);
      sum += height;
      endIndex = i;
      if (sum >= containerHeight) {
        break;
      }
    }
    return endIndex - fromIndex;
  };
  const getOffset = (scrollTop) => {
    if (isNumber(itemHeightRef.current)) {
      return Math.floor(scrollTop / itemHeightRef.current) + 1;
    }

    // 这里不知道为什么
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < list.length; i++) {
      const height = itemHeightRef.current(i, list[i]);
      sum += height;
      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  }

  // 获取上部高度
  const getDistanceTop = (index) =>  {
    let height
    if (isNumber(itemHeightRef.current)) {
      height = index * itemHeightRef.current;
      return height;
    }
    height = list
      .slice(0, index)
      .reduce((sum, _, i) => sum + (itemHeightRef.current)(i, list[i]), 0);
    return height;
  };

  const totalHeight = useMemo(() => {
    if (isNumber(itemHeightRef.current)) {
      return list.length * itemHeightRef.current;
    }
    return list.reduce(
      (sum, _, index) => sum + (itemHeightRef.current)(index, list[index]),
      0,
  );
  }, [list]);
  const calculateRange = () => {
    // 外部容器
    const container = getTargetElement(containerTarget)
    // 内部容器
    const wrapper = getTargetElement(wrapperTarget)
    if (container && wrapper) {
      const { scrollTop, clientHeight } = container;
      // 根据外部容器的 scrollTop 算出已经“滚过”多少项
      const offset = getOffset(scrollTop);
      const visibleCount = getVisibleCount(clientHeight, offset);
      const start = Math.max(0, offset - overscan);
      const end = Math.min(list.length, offset + visibleCount + overscan);

      const offsetTop = getDistanceTop(start);
      wrapper.style.height = totalHeight - offsetTop + 'px';
      wrapper.style.marginTop = offsetTop + 'px';

      setTargetList(
        list.slice(start, end).map((ele, index) => ({
          data: ele,
          index: index + start,
        })),
      );
    }
  }
  useEffect(() => {
    console.log(111)
    // if (!size?.width || !size?.height) {
    //   return;
    // }
    calculateRange();
  }, [list]);
  useEventListener('scroll', (e) => {
    // 如果是直接跳转，则不需要重新计算
    if(scrollTriggerByScrollToFunc.current) {
      scrollTriggerByScrollToFunc.current = false
      return ;
    }
    e.preventDefault();
    calculateRange();
  },{
    // 外部容器
    target: containerTarget
  })
  // const scrollTo = (index) => {
  //   const container = getTargetElement(containerTarget);
  //   if(container) {
  //     scrollTriggerByScrollToFunc.current = true
  //     container.scrollTop = getDistanceTop(index);
  //   }
  // }
  return [targetList]
}

export default useVirtualList
