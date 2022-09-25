#### 创建一个react+ts的项目

- npx create-react-app my-app --template typescript

#### 高级指引

- [代码分割](https://zh-hans.reactjs.org/docs/code-splitting.html) [简书文章](https://www.jianshu.com/p/d237ae305c9a)  路由懒加载 
- [Fragments](https://zh-hans.reactjs.org/docs/fragments.html) React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点

#### react-route-dom

- [withRouter](https://reactrouter.com/web/api/withRouter)  withRouter(app)   让app组件有能力获取到router里的所有参数和内容

#### [react-loadable](https://github.com/jamiebuilds/react-loadable)

## Hook

父组件往子组件传值或者函数 虽然本身没有变化 但是引用类型的地址是变化的，所以会重新渲染组件，通过缓存保证他们栈里的地址不变，那么就不会重新渲染子组件

https://www.joshwcomeau.com/react/usememo-and-usecallback/

### useMemo

> vue的computed,依赖的值不改变不会重新执行

```react
const [number, setNumber] = useState(0)
const result = React.useMemo(() => {
	return count()
},[number])
```

通过memo包装也可以达到同样的效果

```react
React.memo(Component)
```

### useCallback

> 缓存函数

```react
const handleMegaBoost = React.useCallback(() => {
  setCount((currentValue) => currentValue + 1234)  
},[])

// 这样也行不过需要自己return
const handleMegaBoost = React.useMemo(() => {
    return function() {
        setCount((currentValue) => currentValue + 1234)  
    }
})
```

### [useRef](https://react.docschina.org/docs/hooks-reference.html#useref)

```react
import {forwardRef, useImperativeHandle, useRef} from "react";

//通过forwardRef可以将ref转发给子组件
// 直接暴露给父组件带来的问题是某些情况的不可控 所以需要useImperativeHandle
const MyInput = forwardRef((props, ref) => {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))
  return <input type="text" ref={inputRef}/>
})


function Demo (props,ref) {
  const inputRef = useRef()
  (() => {
    console.log(inputRef)
  },5000)
  return (
    <div>
      demo
      <MyInput ref={inputRef}></MyInput>
    </div>
  )
}
export default Demo
```

### useLayoutEffect

> useLayoutEffect和原来componentDidMount&componentDidUpdate一致，在react完成DOM更新后马上同步调用的代码，会阻塞页面渲染。而useEffect是会在整个页面渲染完才会调用的代码。

### useContext

```jsx
const Child = (props) => {
  return <div>child
    <Context.Consumer>
      {(value) => {
        return (
          <div>
            第一种使用Context方式获取的值：{JSON.stringify(value)}
          </div>
        );
      }}
    </Context.Consumer>
  </div>
}
const Context = createContext()

const Child2 = () => {
  const child2Context = useContext(Context)
  console.log(child2Context,'child2Context')
  return <div>
    child2
  </div>
}
function Parent (props,ref) {
  const [color, setColor] = useState({
    name: 123,
    age: 123
  })
  return (
    <div>
      <Context.Provider value={color}>
        <Child></Child>
        <Child2></Child2>
      </Context.Provider>
    </div>
  )
}
export default Parent
```
