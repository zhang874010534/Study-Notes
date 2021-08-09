<template>
  <div id="nav">
    <validate-input :rules="emailRules" v-model="params.email" placeholder="请输入邮箱地址"></validate-input>
    {{params.email}}
</template>

<script lang="ts">
import { defineComponent,reactive} from 'vue'
import ValidateInput,{RulesProp} from './ValidateInput.vue'
export default defineComponent({
  components:{
    'validate-input':ValidateInput
  },
  setup() {
    const emailRules: RulesProp = [
      { type:'required', message:'电子邮箱不能为空'},
      { type:'email', message:'邮箱错误'}
    ]
    const params = reactive({
      email: ''
    })

    return {
      emailRules,
      params
    }
  },
})
</script>
