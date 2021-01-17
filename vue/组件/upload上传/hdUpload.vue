<template>
    <div>
        <input
            type="file"
            id="file"
            style="display: none;"
            @change="fileChange"
            :accept="fileType"
            :multiple="needMultiple"
        />
        <div class="progress-box" v-show="isWaiting">
            <div class="progress-bar" :style="`width: ${uploadPercent}%;`"></div>
        </div>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'

const MD5 = str => CryptoJS.MD5(str).toString().toUpperCase()

export default {
    name: 'hdUpload',

    props: {
        fileType: {
            type: String,
            default: 'image/*'
        },
        maxSize: {
            type: Number,
            default: 5
        },
        needMultiple: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            uploadFiles: {},
        }
    },

    computed: {
        isWaiting() {
            return Object.keys(this.uploadFiles).length > 0
        },
        uploadPercent() {
            let tmp = 0
            let total = 0
            let loaded = 0
            const files = this.uploadFiles
            for (let key in files) {
                if (files.hasOwnProperty(key)) {
                    const item = files[key]
                    if (item.hasOwnProperty('size')) {
                        total += item.size
                        loaded += item.loaded
                    }
                }
            }
            if (total > 0) {
                tmp = loaded / total
            }
            return tmp
        },
    },

    watch: {
        isWaiting: {
            handler(newVal, oldVal) {
                if (oldVal && !newVal) {
                    this.$emit('upload-end')
                }
            },
            immediate: true,
        },
    },

    methods: {
        choosedFile() {
            if (this.isWaiting) {
                return
            }
            const fileItem = this.$el.querySelector('#file')
            if (fileItem) {
                fileItem.value = ''//相同文件不会触发change
                fileItem.click()
            }
        },
        fileChange(e) {
            const fileArr = Array.from(e.target.files)
            if (fileArr && fileArr.length > 0) {
                const totalSize = fileArr.reduce((a, b) => a + ~~b.size, 0)
                if (totalSize > this.maxSize*1024*1024) {
                    this.$message.error(`请选择${this.maxSize}M以内的文件！`)
                    return
                }
                this.$emit('upload-start')
                
                fileArr.forEach((ele, index) => {
                    const fileKey = MD5(ele.name + '_' + index)
                    this.$set(this.uploadFiles, fileKey, {})
                    
                    this.hdUpload({
                        file: ele,
                        fileKey: fileKey,
                        fileType: null,
                        success: res => {
                            this.$delete(this.uploadFiles, fileKey)
                            res.result.fileName = ele.name
                            this.$emit('upload-success', res)
                        },
                        progress: res => {
                            this.uploadFiles[fileKey] = res.total
                        },
                        fail: res => {
                            this.$delete(this.uploadFiles, fileKey)
                            res.fileName = ele.name
                            this.$emit('upload-fail', res)
                        },
                    })
                })
            }
        },
    }
}
</script>
    
<style scoped lang="scss">
</style>
