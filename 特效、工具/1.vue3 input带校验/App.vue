<template>
  <div id="nav">
    <validate-form @form-submit="formSubmit">
      <validate-input :rules="emailRules" v-model="params.email" placeholder="请输入邮箱地址"></validate-input>
      <validate-input :rules="passwordRules" v-model="params.password" placeholder="请输入密码"></validate-input>
      <validate-input :rules="repeatPasswordRules" v-model="params.repeatPassword" placeholder="请输入密码"></validate-input>
      <template v-slot:submit>
        <button type="submit">自定义提交按钮</button>
      </template>
    </validate-form>
    {{params.email}}
  </div>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent,onErrorCaptured,reactive,ref,toRefs,watch} from 'vue'
import ValidateInput,{RulesProp} from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'

export default defineComponent({
  components:{
    'validate-input':ValidateInput,
    'validate-form':ValidateForm,
  },
  setup() {
    const params = reactive({
      email: '',
      password: '',
      repeatPassword: ''
    })
    const emailRules: RulesProp = [
      { type:'required', message:'电子邮箱不能为空'},
      { type:'email', message:'邮箱错误'}
    ]
    const passwordRules: RulesProp = [
      { type:'required', message:'密码不能为空'},
    ]
    const repeatPasswordRules: RulesProp = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        validator: () => {
          return params.password === params.repeatPassword
        },
        message: '密码不相同'
      }
    ]
    const inputRef = ref(null)
    
    const formSubmit = (boolean:boolean) => {
      params.email = ''
      params.password = ''
      params.repeatPassword = ''
      console.log(boolean)
    }
    return {
      emailRules,
      passwordRules,
      params,
      formSubmit,
      inputRef
    }
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
