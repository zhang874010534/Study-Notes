<template>
  <div class="image-upload">
    <div class="file-list">
      <div class="file-item" v-for="(item, index) in fileList" :key="index">
        <img :src="`/nis-file-server${item.url}`" alt="" @click="previewImage(index)">
        <div class="cross">
          <van-icon name="cross" class="cross-icon" color="white" size="12" @click="deleteFile(index)"/>
        </div>
      </div>
    </div>
    <van-icon
        name="photograph"
        size="30"
        @click="showImagePopup"
    />
    <van-action-sheet v-model="show">
      <div class="action-item">
        拍照
        <input
            type="file"
            accept="image/*"
            class="photo-file"
            @change="fileChange"
        >
      </div>
      <div class="action-item" @click="continuousPhoto" v-if="showContinuous">
        连拍拼图
      </div>
    </van-action-sheet>
    <van-popup
        v-model="showCamera"
        position="right"
        :style="{ width: '100%', height: '100%' }"
        get-container="body"
    >
      <div class="photo-wrapper">
        <div class="camera-wrapper">
          <video ref="video" autoplay muted playsinline webkit-playsinline></video>
        </div>
        <div class="photo-bottom">
          <div class="left-photo">
            <template v-if="photos.length > 0">
              <img :src="photos[photos.length - 1].url" alt="" @click="showImageEdit"/>
            </template>
          </div>
          <div
              class="take-photo"
              @click="takePhoto"
          >
            <div class="take-photo-button">
            </div>
          </div>
          <!--反转 先不做-->
          <div style="opacity: 0">
            <svg t="1767929090331" class="icon" viewBox="0 0 1129 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2077" id="mx_n_1767929090332" width="50" height="50"><path d="M1023.717517 176.128h-88.487724c-35.416276 0-88.523034-26.835862-109.179586-50.740966l-58.968276-68.67862C734.561103 20.903724 693.248 0 646.073379 0h-159.320276c-53.106759 0-88.523034 17.902345-126.870069 59.709793l-58.968275 68.678621c-17.725793 20.868414-70.832552 47.739586-106.248828 47.739586H109.144276C50.176 176.128 0 220.936828 0 277.645241v644.837518c0 53.742345 44.243862 98.515862 100.281379 101.517241H1020.822069C1079.755034 1024 1129.931034 976.225103 1129.931034 922.482759V277.645241c0-56.708414-47.209931-101.517241-106.213517-101.517241zM1070.962759 925.484138c0 23.869793-20.656552 41.807448-50.14069 41.807448H103.247448c-26.553379 0-44.243862-20.903724-44.243862-41.807448V277.645241c0-23.869793 20.656552-41.807448 50.14069-41.807448h85.556965c56.072828 0 123.93931-35.80469 150.45738-68.64331l59.003586-68.678621c26.553379-29.837241 47.209931-38.806069 82.626207-38.806069h159.320276c29.484138 0 56.037517 11.934897 76.694069 35.84l59.003586 68.64331c29.519448 32.838621 97.350621 68.678621 153.423448 68.678621h88.487724c26.553379 0 50.14069 17.902345 50.14069 41.772138V925.484138h-2.930759z" fill="#ffffff" p-id="2078"></path><path d="M798.084414 544.909241c-0.03531-55.084138-16.136828-106.142897-43.537655-148.374069-0.388414-0.741517-0.670897-1.483034-1.129931-2.153931-3.389793-5.15531-7.097379-9.992828-10.804966-14.795034-0.423724-0.600276-0.812138-1.200552-1.271172-1.765517a245.971862 245.971862 0 0 0-92.195311-73.622069c-0.98869-0.459034-1.977379-0.98869-2.966069-1.412414a275.173517 275.173517 0 0 0-17.372689-6.779586c-2.118621-0.741517-4.201931-1.553655-6.355862-2.224552a224.679724 224.679724 0 0 0-15.536552-4.272552c-2.860138-0.706207-5.755586-1.483034-8.686345-2.11862-1.412414-0.282483-2.824828-0.706207-4.237241-0.98869-3.884138-0.706207-7.803586-1.05931-11.723035-1.588966-2.718897-0.353103-5.367172-0.776828-8.086069-1.05931a241.169655 241.169655 0 0 0-19.597241-1.094621c-1.165241 0-2.330483-0.176552-3.531035-0.176551l-0.600275 0.07062a235.096276 235.096276 0 0 0-141.029518 47.386483 32.768 32.768 0 0 0-7.273931 43.855448 28.495448 28.495448 0 0 0 41.277793 7.732966 178.705655 178.705655 0 0 1 125.528276-35.098483l4.978759 0.706207c4.449103 0.564966 8.898207 1.235862 13.241379 2.118621 1.942069 0.423724 3.813517 0.953379 5.720276 1.412413 4.272552 1.024 8.545103 2.118621 12.711724 3.460414 1.306483 0.423724 2.612966 0.953379 3.954759 1.412414 4.766897 1.659586 9.463172 3.425103 14.088827 5.473104l1.412414 0.670896a190.216828 190.216828 0 0 1 70.726621 56.35531l0.353103 0.494345a206.424276 206.424276 0 0 1 42.654897 126.411035h-49.434483L768.423724 670.896552 847.448276 544.909241h-49.363862zM651.193379 712.951172a178.740966 178.740966 0 0 1-125.245793 35.098483c-2.08331-0.176552-4.13131-0.529655-6.21462-0.812138-3.990069-0.564966-7.980138-1.129931-11.899587-1.942069-2.365793-0.494345-4.731586-1.129931-7.062069-1.765517a173.373793 173.373793 0 0 1-11.29931-3.03669c-1.836138-0.600276-3.566345-1.271172-5.367172-1.906758a169.383724 169.383724 0 0 1-12.711725-4.943449c-0.918069-0.388414-1.836138-0.882759-2.754206-1.306482a189.757793 189.757793 0 0 1-14.30069-7.344552l-0.635586-0.353103a191.170207 191.170207 0 0 1-42.725518-33.968552l-0.600275-0.706207a180.365241 180.365241 0 0 1-11.19338-13.100138c-0.741517-0.953379-1.447724-2.01269-2.224551-3.001379a206.141793 206.141793 0 0 1-41.101242-124.221793h49.363862L326.196966 423.724138 247.172414 549.640828h49.399172c0 55.190069 16.242759 106.390069 43.714207 148.656551 0.353103 0.600276 0.564966 1.235862 0.953379 1.836138 2.824828 4.307862 6.002759 8.333241 9.074759 12.393931 1.129931 1.553655 2.224552 3.177931 3.389793 4.660966 4.519724 5.826207 9.286621 11.264 14.194759 16.595862l1.377103 1.553655a246.81931 246.81931 0 0 0 55.507862 44.173241l1.624276 1.024c5.861517 3.319172 11.864276 6.355862 17.972966 9.18069 1.518345 0.706207 3.001379 1.483034 4.555034 2.189241 5.190621 2.295172 10.557793 4.272552 15.924966 6.214621 2.577655 0.918069 5.12 1.871448 7.697655 2.683586 4.696276 1.483034 9.533793 2.754207 14.406621 3.954759 3.177931 0.812138 6.391172 1.659586 9.675034 2.295172 1.377103 0.353103 2.648276 0.776828 4.025379 0.98869 4.555034 0.882759 9.18069 1.341793 13.771035 1.942069l4.908138 0.706207c8.262621 0.847448 16.454621 1.412414 24.681931 1.412414 50.176 0 99.151448-16.313379 141.206069-47.563035a32.838621 32.838621 0 0 0 7.23862-43.855448 28.530759 28.530759 0 0 0-41.277793-7.732966z" fill="#ffffff" p-id="2079"></path></svg>
            </svg>
          </div>
        </div>
        <div id="flash-layer"></div>
      </div>
    </van-popup>
    <van-popup
        v-model="imageEditPopup"
        position="right"
        :style="{ width: '100%', height: '100%' }"
        get-container="body"
    >
      <div class="image-edit-popup">
        <header-com showGoBack>
          <template v-slot:headerLeft>
            <div @click="imageEditPopup = false">
              继续拍照
            </div>
          </template>
          <template v-slot:headerRight>
            <div @click="finishPhoto">
              完成
            </div>
          </template>
        </header-com>
        <div class="content">
          <div class="content-image-item" v-for="(item, index) in photos" :key="index">
            <img :src="item.url">
          </div>
        </div>
        <div class="image-list">
          <div class="image-item" v-for="(item, index) in photos" :key="index">
            <img :src="item.url">
            <div class="cross">
              <van-icon name="cross" class="cross-icon" color="white" size="12" @click="deletePhotoImage(index)"/>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {Icon, ActionSheet, Popup, Toast, ImagePreview, Dialog } from 'vant'
import HeaderCom from "@/views/mobile2025/selectCheckSheet/components/headerCom.vue";
import common from "@/common/js/common";
import {dataURLtoFile, downloadFile} from "@/utils/util";
import dayjs from "dayjs";
// 引入SortableJS
import Sortable from 'sortablejs'
export default {
  components: {
    HeaderCom,
    [Icon.name]: Icon,
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
  },
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    waterMark: {
      type: Number,
      default: 0
    },
    watermarkContent: {
      type: String,
      default: ''
    },
    showContinuous: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false,
      actions: [
        { name: '拍照' },
        { name: '连拍拼图' },
      ],
      showCamera: false,
      stream: null,
      photos: [],
      imageEditPopup: false,
      upLoadUrl: common.upLoadUrl, // 图片上传地址
      sortableInstance: null,
    }
  },
  mounted () {
  },
  beforeDestroy() {
    this.stream && this.stream.getTracks().forEach(t => t.stop())
  },
  methods: {
    showImagePopup () {
      this.show = true
    },
    continuousPhoto (item) {
      this.show = false;
      this.showCamera = true
      this.openCamera()
    },
    async openCamera() {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          noiseSuppression: false,
          echoCancellation: false,
          imageCaptureEnabled: false, // 关闭部分设备的高级拍照特性
          width: { ideal: 640, max: 800 }, // 后置最高800x600（比前置略高但不卡顿）
          height: { ideal: 480, max: 600 },
          frameRate: { ideal: 30, max: 30 }, // 强制15帧（无商量）
          focusMode: 'manual', // 关闭自动对焦（核心！减少卡顿）
          exposureMode: 'manual', // 关闭自动曝光调整
          whiteBalanceMode: 'manual', // 关闭自动白平衡
          facingMode: 'environment'
        }
      })
      let video = this.$refs.video
      video.srcObject = this.stream
      this.photos = []
    },
    takePhoto() {
      const video = this.$refs.video
      let canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)

      const img = {
        url: canvas.toDataURL('image/jpeg', 0.9)
      }
      canvas = null
      this.photos.push(img)
      let flashLayer = document.getElementById('flash-layer'); // 闪屏层
      // 激活闪屏样式
      flashLayer.classList.add('flash')
      // 150ms后移除样式（动画时长和CSS保持一致）
      setTimeout(() => {
        flashLayer.classList.remove('flash')
        flashLayer = null
      }, 150);
    },
    showImageEdit () {
      this.imageEditPopup = true
      this.$nextTick(() => {
        this.initSortable()
      })
    },
    async finishPhoto () {
      let imageUrl = await this.mergeImagesVertical(this.photos)
      let file = dataURLtoFile(imageUrl, 'image.jpg')
      file = await this.addWatermark(file)
      let serviceImageUrl = await this.upload(file)
      let fileList = [
        ...this.fileList,
        {
          url: `${serviceImageUrl.uriName}`,
        }
      ]
      this.$emit('update:fileList', fileList)
      this.showCamera = false
      this.imageEditPopup = false
      this.stream && this.stream.getTracks().forEach(t => t.stop())
    },
    loadImage (src) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
      })
    },
    async mergeImagesVertical (imageList) {
      // 1. 加载所有图片
      const images = await Promise.all(imageList.map(item => this.loadImage(item.url)))

      // 2. 计算 canvas 尺寸
      const canvasWidth = Math.max(...images.map(img => img.width))
      const canvasHeight = images.reduce((sum, img) => sum + img.height, 0)

      // 3. 创建 canvas
      const canvas = document.createElement('canvas')
      canvas.width = canvasWidth
      canvas.height = canvasHeight

      const ctx = canvas.getContext('2d')

      // 4. 从上到下绘制
      let y = 0
      images.forEach(img => {
        ctx.drawImage(img, 0, y)
        y += img.height
      })

      // 5. 导出结果
      return canvas.toDataURL('image/jpeg', 0.9)
    },
    async compressImg(file, data) {
      const reader = new FileReader()
      // readAsDataURL 方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyState 会变成已完成DONE，并触发 loadend (en-US) 事件，
      // 同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。
      reader.readAsDataURL(file);
      const res1 = await new Promise((resolve, reject) => {
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;
          let that = this
          img.onload = () => {
            // 图片的宽高
            const w = img.width;
            const h = img.height;
            const canvas = document.createElement("canvas");
            // canvas对图片进行裁剪
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#fff";
            // fillRect()方法绘制一个填充了内容的矩形，这个矩形的开始点（左上点）在
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, w, h);
            // canvas转图片达到图片压缩效果
            const dataUrl = canvas.toDataURL("image/jpeg", 0.1);
            const res = dataURLtoFile(dataUrl, file.name)
            resolve(res)
          }
        }
      })
      return res1
    },
    async upload(data) {
      const fd = new FormData()
      fd.append('file', data)
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      })
      const res = await common.axios({
        url: this.upLoadUrl,
        type: 'post',
        data: fd
      }).finally(() => {
        Toast.clear()
      })
      return res
    },
    deleteFile (index) {
      Dialog.confirm({
        title: '确认删除?',
        message: '',
      }).then(() => {this.fileList.splice(index, 1)
        this.$emit('update:fileList', this.fileList)
      }).catch(() => {
      })

    },
    deletePhotoImage (index) {
      this.photos.splice(index, 1)
    },
    previewImage (index) {
      console.log(this.fileList, 'this.fileList')
      ImagePreview({
        images: this.fileList.map(item => `/nis-file-server${item.url}`),
        startPosition: index,
        closeable: true,
      });
    },
    async fileChange (e) {
      this.show = false
      let file = e.target.files[0];
      if (!file) return;
      const res = await this.compressImg(file)
      let serviceImageUrl = await this.upload(res)
      let fileList = [
        ...this.fileList,
        {
          url: `/nis-file-server${serviceImageUrl.uriName}`,
        }
      ]
      this.$emit('update:fileList', fileList)
    },
    // 添加水印的核心方法
    addWatermark(file) {
      let that = this
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (e) {
          const img = new Image();
          img.src = e.target.result;

          img.onload = function () {
            // 创建Canvas元素
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // 设置Canvas尺寸与图片一致
            canvas.width = img.width;
            canvas.height = img.height;

            // 绘制原图
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // 添加水印文字
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // 水印颜色和透明度
            // 以图片宽度的2%作为字体大小（可根据需要调整比例）
            const fontSize = Math.max(16, Math.floor(canvas.width * 0.02));
            ctx.font = `${fontSize}px Microsoft YaHei`;
            ctx.textAlign = 'center'; // 文字对齐方式
            ctx.textBaseline = 'middle'; // 文字基线

            // 水印内容
            let watermarkText
            if (that.waterMark === 1) {
              watermarkText = `${common.getLocalStorage("AD_loginName")}  ${common.getLocalStorage("AD_staffName")}  ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`
            } else if (that.waterMark === 2) {
              watermarkText = that.td.watermarkContent
            } else {
              watermarkText = ''
            }


            // 计算文字宽度，用于旋转和定位
            const textWidth = ctx.measureText(watermarkText).width;

            // 绘制斜向重复水印
            const angle = -Math.PI / 6; // 旋转角度
            // 同时按比例调整间距
            const stepX = textWidth + canvas.width * 0.1; // 水平间距为图片宽度的5%
            const stepY = canvas.height * 0.2; // 垂直间距为图片高度的10%

            // 计算需要绘制多少行和列水印
            const cols = Math.ceil(canvas.width / stepX) + 1;
            const rows = Math.ceil(canvas.height / stepY) + 1;

            for (let i = 0; i < rows; i++) {
              for (let j = 0; j < cols; j++) {
                const x = j * stepX;
                const y = i * stepY;

                // 保存当前状态
                ctx.save();
                // 平移到绘制位置
                ctx.translate(x, y);
                // 旋转
                ctx.rotate(angle);
                // 绘制文字
                ctx.fillText(watermarkText, 0, 0);
                // 恢复状态
                ctx.restore();
              }
            }

            // 将Canvas内容转为Blob
            canvas.toBlob(function (blob) {
              // 将Blob转为File对象
              const watermarkedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(watermarkedFile);
            }, file.type);
          };
        };
      });
    },
    initSortable () {
      if (this.sortableInstance) {
        this.sortableInstance.destroy()
        this.sortableInstance = null
      }
      const dragDom = document.querySelector('.image-list')
      console.log(dragDom, 'dragDom')
      const dataCopy = JSON.parse(JSON.stringify(this.photos))
      // eslint-disable-next-line no-new
      this.sortableInstance = new Sortable(dragDom, {
        multiDrag: true, // Enable multi-drag
        selectedClass: 'selected', // The class applied to the selected items
        fallbackTolerance: 3, // So that we can select items on mobile
        animation: 150,
        onEnd: evt => {
          const currRow = dataCopy.splice(evt.oldIndex, 1)[0]
          dataCopy.splice(evt.newIndex, 0, currRow)
          this.photos = dataCopy
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.photo-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  .camera-wrapper {
    width: 100%;
    aspect-ratio: 3 / 4;
    background: #000;
    overflow: hidden;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: translateZ(0);
      will-change: transform;
    }
  }
  .photo-bottom {
    flex: 1;
    background: #000000;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-photo {
      width: 60px;
      height: 60px;
      background: white;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .take-photo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 4px solid white;
      background: #000000;
      overflow: hidden;
      padding: 2px;
      .take-photo-button {
        width: 100%;
        height:  100%;
        background: white;
        border-radius: 50%;
        &:active {
          scale: 90%;
          //transition: all 0.3s ease-in-out;
        }
      }
    }
  }
}

.image-edit-popup {
  display: flex;
  flex-direction: column;
  height: 100%;
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    overflow: auto;
    .content-image-item {
      img {
        width: 160px;
        object-fit: contain;
      }
    }
  }
  .image-list {
    display: flex;
    padding: 16px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
    }
    .image-item {
      margin-right: 16px;
      position: relative;
      img {
        width: 70px;
        height: 70px;
      }
      .cross {
        position: absolute;
        right: -4px;
        top: -4px;
        background: black;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

  }
}
.image-upload {
  display: flex;
  align-items: center;
  .file-list {
    display: flex;
    align-items: center;
    .file-item {
      position: relative;
      margin-right: 8px;
    }
    img {
      width: 50px;
      height: 50px;
    }
    .cross {
      position: absolute;
      right: -4px;
      top: -4px;
      background: black;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.action-item {
  text-align: center;
  font-size: 20px;
  padding: 8px;
  position: relative;
}
.photo-file {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
}
#flash-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0; /* 默认透明隐藏 */
  pointer-events: none; /* 不遮挡点击事件 */
  z-index: 10; /* 确保在视频上方 */
  /* 闪屏动画：快速变亮再变暗 */
  transition: opacity 0.12s ease-out;
  &.flash {
    opacity: 1;
  }
}
</style>
