[JEST中文文档](https://www.jestjs.cn/docs/expect#toequalvalue)

[JEST英文文档](https://jestjs.io/)

[Vue Test Utils](https://vue-test-utils.vuejs.org/zh/)

### Describe it [expect](https://www.jestjs.cn/docs/expect)

```js
describe('HelloWorld.vue', () => {
  it('renders props.msg when ', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    })
    // expect(wrapper.text()).toMatch(msg)
    expect(wrapper.text()).not.toEqual(msg)
  })
})
```

### 预设和清理

