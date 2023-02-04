https://juejin.cn/post/6983130251702304781

```tsx
// 再另外组件中使用我们定义好的插槽
const UseSlotComponent = {
  name: 'UseSlotComponent',

  setup() {

    return () => {
      // 方式一
      const Test1 = (
        <Test-Slot-Component>
          <div>这里即为默认default插槽， 直接写入即可</div>
        </Test-Slot-Component>
      );


      const TestSlot2 = {
        default: () => {
          return (
            <div>
              默认插槽
            </div>
          )
        },

        headerSlot: props => {
          return (
            <div>
              自定义插槽 props 是作用域数据
              {
                props
              }
            </div>
          )
        }
      }

      
      // 方式二
      const Test2 = (
        <Test-Slot-Component>
          {
            TestSlot2
          }
        </Test-Slot-Component>
      )


      // 方式三
      const Test3 = (
        <Test-Slot-Component 
          v-slots={TestSlot2}
        />
      )

      // 方式四
      const Test4 = h(TestSlotComponent, null, TestSlot2)


      return (
        <div>
          { Test1 }   // 如果只使用default默认插槽
          { Test2 }  // 使用多个模板插槽
          { Test3 }  // 使用多个模板插槽
          { Test4 }  // 使用多个模板插槽
        </div>
      )
    }
  }
}
```

