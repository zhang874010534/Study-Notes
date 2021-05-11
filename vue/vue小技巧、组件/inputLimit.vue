<template>
  <div>
    <el-input
      placeholder="超过多少给奖励"
      class="extra-reward"
      type="number"
      :value="item.exceed"
      @input="inputLimit($event, item, 'exceed')"
    >
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'moonLightOverview',
  data() {
    return {

    }
  },
  inject: ['setLeftNavActive'],
  components: {
  },
  computed: {
  },
  created() {
    this.setLeftNavActive('moonLightOverview')
  },
  mounted() {
  },
  methods: {
    // 好像可以通用   不能为负数
    // obj 修改的对象
    // attribute 对象下的属性
    inputLimit(val, obj, attribute) {
      if (val) {
        val = Number(val)
        if (val < 0) val = 0
        obj[attribute] = parseFloat(val.toFixed(2))
      } else {
        obj[attribute] = null
      }
    },
  },
}
</script>
<style lang="scss" scoped>

</style>