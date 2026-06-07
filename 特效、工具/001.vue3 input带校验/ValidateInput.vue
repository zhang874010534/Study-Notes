<template>
  <input 
    type="text" 
    @blur="validateInput"
    :value="inputRef.val"
    @input="updateValue"
    v-bind="$attrs"
  >
  <div v-if="inputRef.error">{{inputRef.message}}</div>
</template>
<script lang="ts">
import { computed, defineComponent,onMounted,PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'
interface RuleProp {
  type: 'required' | 'email';
  message: string
}
export type RulesProp = RuleProp[];
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
export default defineComponent({
  props:{ 
    rules: Array as PropType<RulesProp>,  
    modelValue: String
  },
  setup(props,context) { 
    const inputRef = reactive({
      val: computed({
        get:() => {
          return props.modelValue ||''
        },
        set:(val) => {
          context.emit('update:modelValue',val)
        }
      }),
      error: false, 
      message: ''
    })
    
    
    const updateValue = (e:Event) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue',targetValue)
    }
    const validateInput = () => {
      if(props.rules){
        const allPass = props.rules.every((ruleItem) => {
          let passed = true
          inputRef.message = ruleItem.message
          switch (ruleItem.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break;
            case 'email':
              passed = emailReg.test(inputRef.val)
              break;
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default: 
              break;
          }
          return passed
        })
        inputRef.error = !allPass
        return allPass
      }
      return true;
    }
    
    onMounted(() => {
      emitter.emit('form-item-created',validateInput)
    })
    return {
      inputRef,
      validateInput,
      updateValue,
    }
  },
})
</script>
