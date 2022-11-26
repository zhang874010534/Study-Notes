<!--使用-->
<template>
  <WOperate
      :filterList="{
        permission1: {
          show: getPermission('permission1'),
        },
        permission2: {
          show: getPermission('permission2'),
        },
      }"
  >
    <template #permission1>
      <Component1></Component1>
    </template>
    <template #permission2>
      <Component2></Component2>
    </template>
  </WOperate>
</template>


<!--组件实现-->
<template>
  <div>
    <div v-for="(item, index) in filterSlotsOne" :key="item.key" class="template-wrapper">
      <slot :name="item.key"></slot>
      <a-divider type="vertical" v-if="filterSlotsTwo.length !== 0 || index < filterSlotsOne.length - 1"></a-divider>
    </div>
    <a-dropdown v-if="filterSlots.length > 3">
      <a class="w-iconfont w-ellipsis" @click.prevent></a>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="item in filterSlotsTwo" :key="item.key">
            <slot :name="item.key"></slot>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup lang="tsx">
const props = defineProps({
  filterList: {
    type: Object,
    default: () => ({}),
  },
})

const slots = useSlots()
const filterSlots = ref([])
const filterSlotsOne = ref([])
const filterSlotsTwo = ref([])
watch(
    () => props.filterList,
    () => {
      filterSlots.value = []
      filterSlotsOne.value = []
      filterSlotsTwo.value = []
      for (const slotsKey in slots) {
        if (props.filterList[slotsKey].show) {
          filterSlots.value.push({
            key: slotsKey,
          })
        }
      }
      if (filterSlots.value.length > 3) {
        filterSlots.value.forEach((item, index) => {
          if (index > 1) {
            filterSlotsTwo.value.push(item)
          } else {
            filterSlotsOne.value.push(item)
          }
        })
      } else {
        filterSlots.value.forEach(item => {
          filterSlotsOne.value.push(item)
        })
      }
    },
    {
      immediate: true,
    }
)
</script>
<style lang="scss" scoped>
.template-wrapper {
  display: inline-block;
}
</style>
