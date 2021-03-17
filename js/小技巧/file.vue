<template>
  <div class="wrapper">
    <input type="file" ref="file" accept=".jpg, .jpeg, .png" @change="changeFile" v-show="false">
  </div>
</template>
<script>
// https://blog.csdn.net/leixu1027/article/details/80689872
export default {
  data() {
    return {
    }
  },
  props:{
  
  },
  computed: {},
  mounted() {
   
  },
  destroyed(){
    
  },
  methods: {
    chooseFile(){
      this.$refs.file.value='';
      this.$refs.file.click();
    },
    changeFile(e){
      this.file=e.srcElement.files[0];
      this.fileUrl=URL.createObjectURL(e.srcElement.files[0])
    },
    pasteListener(){
      this.$refs.textareaSend.addEventListener('paste',(event)=>{
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
      })
    },
  },
}
</script>
<style lang="scss" scoped>

</style>