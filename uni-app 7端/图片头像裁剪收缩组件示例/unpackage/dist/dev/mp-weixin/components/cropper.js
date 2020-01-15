(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/cropper"],{

/***/ 23:
/*!*********************************************************************!*\
  !*** E:/study/黑马/资料/uni-app 7端/图片头像裁剪收缩组件示例/components/cropper.vue ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cropper_vue_vue_type_template_id_0113ac26_name_cropper___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cropper.vue?vue&type=template&id=0113ac26&name=cropper& */ 24);
/* harmony import */ var _cropper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cropper.vue?vue&type=script&lang=js& */ 26);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _cropper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _cropper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _cropper_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cropper.vue?vue&type=style&index=0&lang=less& */ 31);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 14);






/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _cropper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _cropper_vue_vue_type_template_id_0113ac26_name_cropper___WEBPACK_IMPORTED_MODULE_0__["render"],
  _cropper_vue_vue_type_template_id_0113ac26_name_cropper___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "E:/study/黑马/资料/uni-app 7端/图片头像裁剪收缩组件示例/components/cropper.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 24:
/*!*****************************************************************************************************************!*\
  !*** E:/study/黑马/资料/uni-app 7端/图片头像裁剪收缩组件示例/components/cropper.vue?vue&type=template&id=0113ac26&name=cropper& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_template_id_0113ac26_name_cropper___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./cropper.vue?vue&type=template&id=0113ac26&name=cropper& */ 25);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_template_id_0113ac26_name_cropper___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_template_id_0113ac26_name_cropper___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 25:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/study/黑马/资料/uni-app 7端/图片头像裁剪收缩组件示例/components/cropper.vue?vue&type=template&id=0113ac26&name=cropper& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 26:
/*!**********************************************************************************************!*\
  !*** E:/study/黑马/资料/uni-app 7端/图片头像裁剪收缩组件示例/components/cropper.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./cropper.vue?vue&type=script&lang=js& */ 27);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 27:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/study/黑马/资料/uni-app 7端/图片头像裁剪收缩组件示例/components/cropper.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 28));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var tabHeight = 70;var _default =
{
  name: "cropper",
  data: function data() {
    return {
      cvsStyleHeight: '0px',
      styleDisplay: 'none',
      styleTop: '-10000px',
      prvTop: '-10000px',
      imgStyle: {},
      selStyle: {},
      showOper: true,
      imgSrc: {
        imgSrc: '' },

      qlty: 0.9,
      postWidthFirst: {} };

  },
  watch: {
    avatarSrc: function avatarSrc() {
      this.imgSrc.imgSrc = this.avatarSrc;
    } },

  props: {
    avatarSrc: '',
    avatarStyle: '',
    selWidth: '',
    selHeight: '',
    expWidth: '',
    expHeight: '',
    minScale: '',
    maxScale: '',
    canScale: '',
    noTab: '',
    quality: '',
    index: '' },

  created: function created() {var _this = this;
    this.ctxCanvas = uni.createCanvasContext('avatar-canvas', this);
    this.ctxCanvasOper = uni.createCanvasContext('oper-canvas', this);

    this.qlty = parseInt(this.quality) || 0.9;
    this.imgSrc.imgSrc = this.avatarSrc;
    this.letScale = this.canScale === 'false' ? 0 : 1;
    this.indx = this.index || undefined;
    this.mnScale = this.minScale || 0.3;
    this.mxScale = this.maxScale || 4;
    this.noBar = this.noTab === 'true' ? 1 : 0;
    if (this.noBar) {
      this.moreHeight = 0;
      this.fWindowResize();
    } else {
      uni.showTabBar({
        complete: function complete(res) {
          _this.moreHeight = res.errMsg === 'showTabBar:ok' ? 50 : 0;
          _this.fWindowResize();
        } });

    }
  },
  methods: {
    fWindowResize: function fWindowResize() {
      var sysInfo = uni.getSystemInfoSync();
      this.platform = sysInfo.platform;
      this.pixelRatio = sysInfo.pixelRatio;
      this.windowWidth = sysInfo.windowWidth;






      this.windowHeight = sysInfo.windowHeight;
      this.cvsStyleHeight = this.windowHeight - tabHeight + 'px';
      this.cvsStyleHeight = this.windowHeight - tabHeight + 'px';

      this.pxRatio = this.windowWidth / 750;

      var style = this.avatarStyle;
      this.imgStyle = style;
      this.expWidth && (this.exportWidth = this.expWidth.indexOf('rpx') >= 0 ? parseInt(this.expWidth) * this.pxRatio :
      parseInt(this.expWidth));
      this.expHeight && (this.exportHeight = this.expHeight.indexOf('rpx') >= 0 ? parseInt(this.expHeight) * this.pxRatio :
      parseInt(this.expHeight));

      if (this.styleDisplay === 'flex') {
        this.fDrawInit(true);
      }
      this.fHideImg();
    },
    fSelect: function fSelect() {var _this2 = this;
      if (this.fSelecting) return;
      this.fSelecting = true;
      setTimeout(function () {
        _this2.fSelecting = false;
      }, 500);

      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['camera', 'album'],
        success: function success(r) {
          uni.showLoading({
            mask: true });

          var path = _this2.imgPath = r.tempFilePaths[0];
          uni.getImageInfo({
            src: path,
            success: function success(r) {
              _this2.imgWidth = r.width;
              _this2.imgHeight = r.height;
              _this2.path = path;
              if (!_this2.hasSel) {
                var style = _this2.selStyle || {};
                if (_this2.selWidth && _this2.selHeight) {
                  var selWidth = _this2.selWidth.indexOf('rpx') >= 0 ? parseInt(_this2.selWidth) * _this2.pxRatio :
                  parseInt(_this2.selWidth),
                  selHeight = _this2.selHeight.indexOf('rpx') >= 0 ? parseInt(_this2.selHeight) * _this2.pxRatio :
                  parseInt(_this2.selHeight);
                  style.width = parseInt(selWidth);
                  style.height = parseInt(selHeight);
                  style.top = parseInt((_this2.windowHeight - style.height - tabHeight) / 2);
                  style.left = parseInt((_this2.windowWidth - style.width) / 2);
                } else {
                  uni.showModal({
                    title: '裁剪框的宽或高没有设置',
                    showCancel: false });

                  return;
                }
                _this2.selStyle = style;

              }

              if (_this2.noBar) {
                _this2.fDrawInit(true);
              } else {
                uni.hideTabBar({
                  complete: function complete() {
                    _this2.fDrawInit(true);
                  } });

              }
            },
            fail: function fail() {
              uni.showToast({
                title: "error3",
                duration: 2000 });

            },
            complete: function complete() {
              uni.hideLoading();
            } });

        } });

    },
    fUpload: function fUpload() {var _this3 = this;
      if (this.fUploading) return;
      this.fUploading = true;
      setTimeout(function () {
        _this3.fUploading = false;
      }, 1000);

      var style = this.selStyle,
      x = parseInt(style.left),
      y = parseInt(style.top),
      width = parseInt(style.width),
      height = parseInt(style.height),
      expWidth = this.exportWidth || width,
      expHeight = this.exportHeight || height;








      this.styleDisplay = 'none';
      this.styleTop = '-10000px';
      this.hasSel = false;
      this.fHideImg();
      uni.canvasToTempFilePath({
        x: x,
        y: y,
        width: width,
        height: height,
        destWidth: expWidth,
        destHeight: expHeight,
        canvasId: 'avatar-canvas',
        fileType: 'png',
        quality: this.qlty,
        success: function success(r) {
          r = r.tempFilePath;















































          _this3.$emit("upload", {
            avatar: _this3.imgSrc,
            path: r,
            index: _this3.indx });


        },
        fail: function fail(res) {
          uni.showToast({
            title: "error1",
            duration: 2000 });

        },
        complete: function complete() {
          _this3.noBar || uni.showTabBar();
        } },
      this);
    },
    fDrawInit: function fDrawInit() {var _this4 = this;var ini = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var allWidth = this.windowWidth,
      allHeight = this.windowHeight,
      imgWidth = this.imgWidth,
      imgHeight = this.imgHeight,
      imgRadio = imgWidth / imgHeight,
      useWidth = allWidth,
      useHeight = allHeight - tabHeight,
      pixelRatio = this.pixelRatio,
      selWidth = parseInt(this.selStyle.width),
      selHeight = parseInt(this.selStyle.height);

      this.fixWidth = 0;
      this.fixHeight = 0;

      if (this.fixWidth) {
        useWidth = selWidth;
        useHeight = useWidth / imgRadio;
      } else if (this.fixHeight) {
        useHeight = selHeight;
        useWidth = useHeight * imgRadio;
      } else if (imgRadio < 1) {
        useWidth = selWidth;
        useHeight = parseInt(useWidth / imgRadio);
      } else {
        useHeight = selHeight;
        useWidth = parseInt(useHeight * imgRadio);
      }

      this.scaleSize = 1;
      this.rotateDeg = 0;
      this.posWidth = parseInt((allWidth - useWidth) / 2);
      this.posHeight = parseInt((allHeight - useHeight - tabHeight) / 2);
      this.useWidth = useWidth;
      this.useHeight = useHeight;


      var style = this.selStyle,
      left = parseInt(style.left),
      top = parseInt(style.top),
      width = parseInt(style.width),
      height = parseInt(style.height),
      canvas = this.canvas,
      canvasOper = this.canvasOper,
      ctxCanvas = this.ctxCanvas,
      ctxCanvasOper = this.ctxCanvasOper;
      ctxCanvasOper.setFillStyle('rgba(0,0,0, 0.5)');
      ctxCanvasOper.fillRect(0, 0, this.windowWidth, top);
      ctxCanvasOper.fillRect(0, top, left, height);
      ctxCanvasOper.fillRect(0, top + height, this.windowWidth, this.windowHeight - height - tabHeight - top);
      ctxCanvasOper.fillRect(left + width, top, this.windowWidth - width - left, height);
      ctxCanvasOper.setLineWidth(1);
      ctxCanvasOper.setStrokeStyle('rgba(255, 255, 255,1)'); //细线的颜色
      ctxCanvasOper.strokeRect(left, top, width, height);
      ctxCanvasOper.setLineWidth(3);
      ctxCanvasOper.setStrokeStyle('rgba(255, 255, 255, 1)'); //粗线的颜色
      ctxCanvasOper.moveTo(left + 20, top);
      ctxCanvasOper.lineTo(left, top);
      ctxCanvasOper.lineTo(left, top + 20);
      ctxCanvasOper.moveTo(left + width - 20, top);
      ctxCanvasOper.lineTo(left + width, top);
      ctxCanvasOper.lineTo(left + width, top + 20);
      ctxCanvasOper.moveTo(left + 20, top + height);
      ctxCanvasOper.lineTo(left, top + height);
      ctxCanvasOper.lineTo(left, top + height - 20);
      ctxCanvasOper.moveTo(left + width - 20, top + height);
      ctxCanvasOper.lineTo(left + width, top + height);
      ctxCanvasOper.lineTo(left + width, top + height - 20);
      ctxCanvasOper.stroke();
      this.postFirst = {
        left: left,
        top: top,
        width: width,
        height: selWidth,
        posWidth: this.posWidth,
        posHeight: this.posHeight };


      ctxCanvasOper.draw(false, function () {
        if (ini) {
          _this4.styleDisplay = 'flex';




          _this4.styleTop = '0';

          ctxCanvas.setFillStyle('black');
          _this4.fDrawImage();
        }
      });

      this.$emit("avtinit");
    },
    fDrawImage: function fDrawImage() {
      var tm_now = Date.now();
      if (tm_now - this.drawTm < 20) return;
      this.drawTm = tm_now;
      var ctxCanvas = this.ctxCanvas;
      ctxCanvas.fillRect(0, 0, this.windowWidth, this.windowHeight - tabHeight);
      //中心点坐标
      ctxCanvas.translate(this.posWidth + this.useWidth / 2, this.posHeight + this.useHeight / 2);
      //比例缩放
      ctxCanvas.scale(this.scaleSize, this.scaleSize);
      ctxCanvas.drawImage(this.imgPath, -this.useWidth / 2, -this.useHeight / 2, this.useWidth, this.useHeight);
      ctxCanvas.draw(false);
    },
    fHideImg: function fHideImg() {
      this.prvImg = '';
      this.prvTop = '-10000px';
      this.showOper = true;
      this.prvImgData = null;
      this.target = null;
    },
    fClose: function fClose() {
      this.styleDisplay = 'none';
      this.styleTop = '-10000px';
      this.hasSel = false;
      this.fHideImg();
      this.noBar || uni.showTabBar();
    },
    fStart: function fStart(e) {
      var touches = e.touches,
      touch0 = touches[0],
      touch1 = touches[1];

      this.touch0 = touch0;
      this.touch1 = touch1;

      if (touch1) {
        var x = touch1.x - touch0.x,
        y = touch1.y - touch0.y;
        this.fgDistance = Math.sqrt(x * x + y * y);
      }
    },
    fMove: function fMove(e) {
      var touches = e.touches,
      touch0 = touches[0],
      touch1 = touches[1];

      if (touch1) {
        var x = touch1.x - touch0.x,
        y = touch1.y - touch0.y,
        fgDistance = Math.sqrt(x * x + y * y),
        scaleSize = 0.005 * (fgDistance - this.fgDistance),
        beScaleSize = this.scaleSize + scaleSize;

        do {
          if (!this.letScale) break;
          if (beScaleSize < this.mnScale) break;
          if (beScaleSize > this.mxScale) break;
          this.scaleSize = beScaleSize;
        } while (0);
        this.fgDistance = fgDistance;

        if (touch1.x !== touch0.x && this.letRotate) {
          x = (this.touch1.y - this.touch0.y) / (this.touch1.x - this.touch0.x);
          y = (touch1.y - touch0.y) / (touch1.x - touch0.x);
          this.rotateDeg += Math.atan((y - x) / (1 + x * y)) * 180 / Math.PI;
          this.touch0 = touch0;
          this.touch1 = touch1;
        }

        this.fDrawImage();
      } else if (this.touch0) {
        var _x = touch0.x - this.touch0.x,
        _y = touch0.y - this.touch0.y,
        beX = this.posWidth + _x,
        beY = this.posHeight + _y;
        if (Math.abs(_x) < 100 && !this.lckWidth) this.posWidth = beX;
        if (Math.abs(_y) < 100 && !this.lckHeight) this.posHeight = beY;
        this.touch0 = touch0;
        this.fDrawImage();
      }
    },
    fEnd: function () {var _fEnd = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {var self, touches, touch0, touch1, style, imgRadio, endWidth, firstWidth, endHeight, firstHigth;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                self = this;
                touches = e.touches,
                touch0 = touches && touches[0],
                touch1 = touches && touches[1];
                if (self.scaleSize < 1) {
                  style = self.selStyle;
                  imgRadio = self.imgWidth / self.imgHeight;
                  //高长宽短
                  if (imgRadio < 1 && self.scaleSize * self.useWidth < style.width) {
                    self.posWidth = style.left;
                    self.scaleSize = 1;
                    setTimeout(function () {
                      self.fDrawImage();
                    }, 100);
                  } else if (self.scaleSize * self.useHeight < style.width) {
                    //高短宽长
                    self.posHeight = style.top;
                    self.scaleSize = 1;
                    setTimeout(function () {
                      self.fDrawImage();
                    }, 100);
                  }
                } else if (this.scaleSize == 1) {
                  endWidth = this.posWidth - this.postFirst.posWidth,
                  firstWidth = this.postFirst.left - this.postFirst.posWidth;
                  endHeight = this.posHeight - this.postFirst.posHeight,
                  firstHigth = this.postFirst.top - this.postFirst.posHeight;
                  if (endWidth > 0 && this.posWidth > this.postFirst.left) {
                    //右滑动过长
                    this.posWidth = this.postFirst.left;
                  } else if (endWidth < 0 && endWidth < firstWidth) {
                    //左滑动过长
                    this.posWidth = -this.postFirst.left + this.postFirst.posWidth * 2;
                  }

                  if (endHeight < 0 && this.posHeight < this.postFirst.top) {
                    //上滑动过长
                    this.posHeight = -this.postFirst.top + this.postFirst.posHeight * 2;
                  } else if (endHeight > 0 && endHeight > firstHigth) {
                    //下滑动过长
                    this.posHeight = this.postFirst.top;
                  }
                  setTimeout(function () {
                    self.fDrawImage();
                  }, 100);

                }
                if (touch0) {
                  this.touch0 = touch0;
                } else {
                  this.touch0 = null;
                  this.touch1 = null;
                }case 4:case "end":return _context.stop();}}}, _callee, this);}));function fEnd(_x2) {return _fEnd.apply(this, arguments);}return fEnd;}(),

    btop: function btop(base64) {
      return new Promise(function (resolve, reject) {
        var arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([u8arr], {
          type: mime })));

      });
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 31:
/*!*******************************************************************************************************!*\
  !*** E:/study/黑马/资料/uni-app 7端/图片头像裁剪收缩组件示例/components/cropper.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./cropper.vue?vue&type=style&index=0&lang=less& */ 32);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cropper_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 32:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/study/黑马/资料/uni-app 7端/图片头像裁剪收缩组件示例/components/cropper.vue?vue&type=style&index=0&lang=less& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/cropper.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/cropper-create-component',
    {
        'components/cropper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(23))
        })
    },
    [['components/cropper-create-component']]
]);
