<template>
  <div class="component-wrapper" :style="'width:' + width + ';' + 'height:' + height">
    <div class="left-hidden">
      <div class="circle" 
      :style="
        'transform: rotate('+ leftCircleRotate +'deg);' +
        'border-top:' + borderWidth +' solid '+ borderColor + ';' +
        'border-right:' + borderWidth +' solid '+ borderColor
      "
      >
      </div>
    </div>
    <div class="right-hidden" >
      <div class="circle" 
      :style="
        'transform: rotate('+ rightCircleRotate +'deg);' +
        'border-top:' + borderWidth +' solid '+ borderColor + ';' +
        'border-left:' + borderWidth +' solid '+ borderColor
      "
      >
      </div>
    </div>
  </div>
  
</template>
<script>
export default {
  props:{
    width:{
      type:String,
      default:'100px'
    },
    height:{
      type:String,
      default:'100px'
    },
    current:{
      type:Number,
      default:3
    },
    total:{
      type:Number,
      default:5
    },
    borderColor:{
      type:String,
      default:'skyblue'
    },
    borderWidth:{
      type:String,
      default:'2px'
    }
  },
  computed:{
    rightCircleRotate(){
      let current = this.current;
      let total = this.total;
      if((current / total) > 0.5 ){
        return 180 - 45;
      }else{
        return parseInt((current / total) * 360) - 45;
      }
    },
    leftCircleRotate(){
      let current = this.current;
      let total = this.total;
      if((current / total) > 0.5 ){
        return parseInt((current / total) * 360) -180 + 45;
      }else{
        return 45;
      }
    },
  },
  data() {
    return {
      
    }
  },
}
</script>
<style lang="scss" scoped>
.component-wrapper{
  display: flex;
}
.left-hidden{
  width: 50%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .circle{
    width: calc(100% * 2);
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border: 2px solid transparent;
    border-radius: 50%;
    box-sizing: border-box;
    transform: rotate(45deg);
  }
}
.right-hidden{
  width: 50%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .circle{
    width: calc(100% * 2);
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    border: 2px solid transparent;
    border-radius: 50%;
    box-sizing: border-box;
    transform: rotate(-45deg);
  }
}
</style>