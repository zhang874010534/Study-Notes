<template>
  <div>
    <input type="file" @change="changeFile">
    <van-button @click="previewWord">预览word</van-button>
    <div id="display">
      123
    </div>
  </div>
</template>
<script>
import {renderAsync} from 'docx-preview'
export default {
  data () {
    return {
      blob: null
    }
  },
  methods: {
    changeFile(e) {
      this.blob = e.target.files[0]
    },
    previewWord() {
      renderAsync(this.blob, document.querySelector("#display"),null,{
        className: "docx", //class name/prefix for default and document style classes
        inWrapper: true, //enables rendering of wrapper around document content
        ignoreWidth: false, //disables rendering width of page
        ignoreHeight: false, //disables rendering height of page
        ignoreFonts: false, //disables fonts rendering
        breakPages: true, //enables page breaking on page breaks
        ignoreLastRenderedPageBreak: true, //disables page breaking on lastRenderedPageBreak elements
        experimental: false, //enables experimental features (tab stops calculation)
        trimXmlDeclaration: true, //if true, xml declaration will be removed from xml documents before parsing
        useBase64URL: false, //if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
        useMathMLPolyfill: false, //includes MathML polyfills for chrome, edge, etc.
        debug: false, //enables additional logging
      })
    }
  }
}
</script>
<style scoped>
#display {
  width: 100vw;
  height: 100vh;
}
</style>
