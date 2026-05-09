<template>
  <div>
  </div>
</template>
<script>

export default {
  name: '',
  data () {
    return {
    }
  },
  watch: {
  },
  components: {
  },
  async mounted () {
  },
  methods: {
    postMessageListener (e) {
      if (e && e.data) {
        if (e.data.type === 'chooseImage') {
          this.chooseImage(e)
        }
      }
    },
    chooseImage(messageE) {
      let that = this
      if (!(typeof plus === 'undefined')) {
        plus.gallery.pick(
            async function (e) {
              try {
                const paths = e.files || [];

                const files = await Promise.all(
                    paths.map(function (path, index) {
                      return that.plusPathToDataUrl(path, index);
                    })
                );

                messageE.source.postMessage({
                  type: 'imageResult',
                  files
                }, '*');

                console.log(files, 'files');
              } catch (err) {
                console.error('转换文件失败：', err);
              }
            },
            function () {
              console.log('取消选择');
            },
            {
              filter: 'image',
              multiple: true,
              maximum: 9,
              system: false
            }
        );
      }
    },
  },
}
</script>

<style scoped>
</style>
