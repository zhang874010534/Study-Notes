<template>
    <div>
        <img :src="url" alt="" style="width: 300px; height: 300px" />
        <input type="file" @change="changeFile" id="file"  @click="clearFile"/>
    </div>
</template>
<script>
// https://www.cnblogs.com/suyuanli/p/8168407.html exif
// https://www.cnblogs.com/haqiao/p/9386212.html
import EXIF from 'exif-js'
export default {
    name: 'iosImage',
    data() {
        return {
            url: '',
        }
    },

    mounted() {},

    methods: {
        rotateImgOrientation(imgDom, file) {
            let orientation;
            let that = this;
            EXIF.getData(file, function () {
                var allMetaData = EXIF.getAllTags(this)
                console.log(allMetaData, '全部标签')
                orientation = EXIF.getTag(this, 'Orientation')
                let canvas = document.createElement('canvas')
                switch (orientation) {
                    case 6: //需要顺时针（向左）90度旋转
                        console.log('需要顺时针90度旋转')
                        that.rotateImg(imgDom, 'left', canvas)
                        break
                    case 8: //需要逆时针（向右）90度旋转
                        console.log('需要逆时针90度旋转')
                        that.rotateImg(imgDom, 'right', canvas)
                        break
                    case 3: //需要180度旋转
                        console.log('需要180度旋转')
                        that.rotateImg(imgDom, 'right', canvas) //转两次
                        that.rotateImg(imgDom, 'right', canvas)
                        break
                }
            })

        },
        //
        rotateImg(img, direction, canvas) {
            //alert(img);
            //最小与最大旋转方向，图片旋转4次后回到原方向
            var min_step = 0
            var max_step = 3
            //var img = document.getElementById(pid);
            if (img == null) return
            //img的高度和宽度不能在img元素隐藏后获取，否则会出错
            var height = img.height
            var width = img.width
            //var step = img.getAttribute('step');
            var step = 2
            if (step == null) {
                step = min_step
            }
            if (direction == 'right') {
                step++
                //旋转到原位置，即超过最大值
                step > max_step && (step = min_step)
            } else {
                step--
                step < min_step && (step = max_step)
            }
            //旋转角度以弧度值为参数
            var degree = (step * 90 * Math.PI) / 180
            var ctx = canvas.getContext('2d')
            switch (step) {
                case 0:
                    canvas.width = width
                    canvas.height = height
                    ctx.drawImage(img, 0, 0)
                    break
                case 1:
                    canvas.width = height
                    canvas.height = width
                    ctx.rotate(degree)
                    ctx.drawImage(img, 0, -height)
                    break
                case 2:
                    canvas.width = width
                    canvas.height = height
                    ctx.rotate(degree)
                    ctx.drawImage(img, -width, -height)
                    break
                case 3:
                    canvas.width = height
                    canvas.height = width
                    ctx.rotate(degree)
                    ctx.drawImage(img, -width, 0)
                    break
            }
            let base64 = canvas.toDataURL('image/jpeg', 0.8)
            this.url = base64
            console.log(base64)
        },
        changeFile(e) {
            let file = e.target.files[0]
            // this.getPhotoOrientation(e.target.files[0])
            let fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            let image = new Image()
            fileReader.onload = (e) => {
                this.url = e.target.result
                image.src = e.target.result
            }
            this.rotateImgOrientation(image, file)
        },
        clearFile() {
            let file = document.querySelector('#file')
            file.value = ''
        }
    },
}
</script>