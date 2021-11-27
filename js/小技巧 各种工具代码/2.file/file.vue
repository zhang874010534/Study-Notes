<template>
  <div class="wrapper">
    <input
      type="file"
      ref="file"
      accept=".jpg, .jpeg, .png"
      @change="changeFile"
      v-show="false"
    />
  </div>
</template>
<script>
// https://blog.csdn.net/leixu1027/article/details/80689872
export default {
  data() {
    return {};
  },
  props: {},
  computed: {},
  mounted() {},
  destroyed() {},
  methods: {
    chooseFile() {
      this.$refs.file.value = '';
      this.$refs.file.click();
    },
    changeFile(e) {
      this.file = e.srcElement.files[0];
      this.fileUrl = URL.createObjectURL(e.srcElement.files[0]);
    },
    pasteListener() {
      this.$refs.textareaSend.addEventListener('paste', (event) => {
        let items = (event.clipboardData || window.clipboardData).items;
        let file = null;
        if (items && items.length) {
          // 搜索剪切板items
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              this.file = items[i].getAsFile();
              this.sendImage();
              break;
            }
          }
        } else {
          log.innerHTML = '<span style="color:red;">当前浏览器不支持</span>';
          return;
        }
      });
    },
    uploadImage(files) {
      files.forEach((item) => {
        const fileItem = this.fileList.find((fileListItem) => {
          if (fileListItem.file) {
            return fileListItem.file.name == item.file.name;
          }
        });
        fileItem.status = 'uploading';
        fileItem.message = '0%';
        let formData = new FormData();
        formData.append('file', item.file);
        formData.append('type', '');
        this.$axios
          .post(`${uploadUrl}?module=focus`, formData, {
            onUploadProgress: function (progressEvent) {
              //原生获取上传进度的事件
              console.log(progressEvent);
              if (progressEvent.lengthComputable) {
                //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                fileItem.message =
                  parseInt((progressEvent.loaded / progressEvent.total) * 100) +
                  '%';
              }
            }
          })
          .then((res) => {
            fileItem.status = ' ';
            fileItem.url = res.data.data[0];
          })
          .catch(() => {
            fileItem.status = 'failed';
          });
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
