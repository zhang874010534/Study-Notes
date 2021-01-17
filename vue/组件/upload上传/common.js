import * as qiniu from 'qiniu-js'

export default {
    data() {
        return {
            multiFileType: 'image/png,image/jpeg,image/jpg,image/gif,audio/mpeg,audio/mp4,video/mp4,text/plain,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,text/csv,application/vnd.ms-xpsdocument,application/vnd.apple.numbers,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,text/rtf,video/quicktime,application/zip,application/x-rar-compressed',
        }
    },

    computed: {
        userInfo() {
            return this.$store.state.userInfo
        },
    },

    watch: {
    },

    beforeRouteLeave (to, from, next) {
        
    },

    methods: {
        hdUpload({file, fileType, success, fail, progress, fileKey = ''}) {
            this.$store.dispatch('apiRequest', {
                url: 'getUploadToken',
                params: {
                    fileKey: fileKey,
                },
                success: res => {
                    if (res.code === 0) {
                        const myDomain = res.data.domain
                        const observable = qiniu.upload(file, null, res.data.upload_token, {
                            fname: "",
                            params: {},
                            mimeType: fileType,
                            }, {
                            useCdnDomain: true,
                            region: qiniu.region[res.data.region]
                            }
                        )
                        observable.subscribe({
                            next: (res) => {
                                progress && progress(res)
                            },
                            error: (err) => {
                                fail && fail({
                                    state: 0,
                                    errmsg: err,
                                })
                                console.log(err)
                            },
                            complete: (res) => {
                                success && success({
                                    state: 1,
                                    result: {
                                        data: res,
                                        domain: myDomain,
                                    },
                                })
                            }
                        })
                    } else {
                        fail && fail(res)
                    }
                },
                fail: res => {
                    fail && fail(res)
                },
            })
        }
    },
}
