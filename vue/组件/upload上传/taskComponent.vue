<template>
    <div>
        <hd-upload
            ref="hdUpload"
            @upload-success="handleSuccess"
            @upload-fail="handleFail"
            :file-type="multiFileType"
            :need-multiple="true"
            :max-size="300"
        />
    </div>
</template>

<script>
import hdUpload from '@/components/hdUpload.vue'
export default {
    name: 'taskComponent',
    props: {
        
    },
    data() {
        return {
        }
    },

    computed: {
        
    },

    components: {
        'hd-upload': hdUpload,
    },

    methods: {
        chooseFile() {
            this.$refs.hdUpload.choosedFile()
        },
        handleSuccess(res) {
            this.showTaskInfo.file_list.push({
                name: res.result.fileName,
                url: res.result.domain + '/' + res.result.data.key,
            })
        },
        handleFail() {
            this.$message.error('上传失败')
        },
    }
}
</script>
    
<style scoped lang="scss">
</style>
