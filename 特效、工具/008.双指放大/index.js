/**
 * 获取两点间距离
 * @param {object} a 第一个点坐标
 * @param {object} b 第二个点坐标
 * @returns
 */
function getDistance(a, b) {
  const x = a.x - b.x;
  const y = a.y - b.y;
  return Math.hypot(x, y); // Math.sqrt(x * x + y * y);
}

/**
 * 获取中点坐标
 * @param {object} a 第一个点坐标
 * @param {object} b 第二个点坐标
 * @returns
 */
function getCenter(a, b) {
  const x = (a.x + b.x) / 2;
  const y = (a.y + b.y) / 2;
  return {x: x, y: y};
}


/**
 * 获取图片缩放尺寸
 * @param {number} naturalWidth
 * @param {number} naturalHeight
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @returns
 */
function getImgSize(naturalWidth, naturalHeight, maxWidth, maxHeight) {
  const imgRatio = naturalWidth / naturalHeight;
  const maxRatio = maxWidth / maxHeight;

  let width, height;
  // 如果图片实际宽高比例 >= 显示宽高比例
  if (imgRatio >= maxRatio) {
    if (naturalWidth > maxWidth) {
      width = maxWidth;
      height = maxWidth / naturalWidth * naturalHeight;
    } else {
      width = naturalWidth;
      height = naturalHeight;
    }
  } else {
    if (naturalHeight > maxHeight) {
      width = maxHeight / naturalHeight * naturalWidth;
      height = maxHeight;
    } else {
      width = naturalWidth;
      height = naturalHeight;
    }
  }
  return { width: width, height: height }
}

/**
 * 更新或删除指针
 * @param {Event} e
 * @param {string} type
 */
function handlePointers(e, type) {
  for (let i = 0; i < pointers.length; i++) {
    if (pointers[i].pointerId === e.pointerId) {
      if (type === 'update') {
        pointers[i] = e;
      } else if (type === 'delete') {
        pointers.splice(i, 1);
      }
    }
  }
}
