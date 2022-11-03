#### 创建一个react+ts的项目

- npx create-react-app my-app --template typescript

#### 高级指引

- [代码分割](https://zh-hans.reactjs.org/docs/code-splitting.html) [简书文章](https://www.jianshu.com/p/d237ae305c9a)  路由懒加载 
- [Fragments](https://zh-hans.reactjs.org/docs/fragments.html) React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点

#### react-route-dom

- [withRouter](https://reactrouter.com/web/api/withRouter)  withRouter(app)   让app组件有能力获取到router里的所有参数和内容

#### [react-loadable](https://github.com/jamiebuilds/react-loadable)

## React16

### Api变化

#### getDerivedStateFromProps

> static getDerivedStateFromProps(nextProps,nextState)  替代 componentWillMount; componentWillReceiveProps;
>
> 在组件实例化、接收到新的 props 、组件状态更新时会被调用

#### getSnapshotBeforeUpdate

> getSnapshotBeforeUpdate（prevProps,prevState）
>
> 在这个阶段我们可以拿到上一个状态 Dom 元素的坐标、大小的等相关信息。用于替代旧的生命周期中的 componentWillUpdate。
> 该函数的返回值将会作为 componentDidUpdate 的第三个参数出现。



## Hook

父组件往子组件传值或者函数 虽然本身没有变化 但是引用类型的地址是变化的，所以会重新渲染组件，通过缓存保证他们栈里的地址不变，那么就不会重新渲染子组件

https://www.joshwcomeau.com/react/usememo-and-usecallback/

### useEffect

```jsx
useEffect(() => {
    const fetchCountries = async () => {
        const response = await fetch(`${BASE_URL}/countries?sort=${key}`);
        const data = await response.json();
        setCountries(data.slice(0, 10));
    };
    fetchCountries();
}, [key]);
```

### useLayoutEffect

> useLayoutEffect和原来componentDidMount&componentDidUpdate一致，在react生成完dom（还没有渲染到页面上）马上同步调用的代码，会阻塞页面渲染。而useEffect是会在整个页面渲染完才会调用的代码。

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

> 返回一个可变对象

```jsx
const [count, setCount] = useState(0);
//extract the 'current' property and assign it a value
const { current: myArray } = useRef(["one", "two", "three"]);

useEffect(() => {
  setCount((count) => count + 1);
}, [myArray]); //the reference value is stable, so no infinite loop
```



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

### [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)

> 可以配合下面的useContext， 不过复杂起来肯定是用redux这样的库

```tsx
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

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
  const  = useContext(Context)
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

## Api

### React.forwardRef 

> 让使用组件的人直接拿到组件里的某个元素

```tsx
const FancyButton = React.forwardRef((props, ref) => (  
    <button ref={ref} className="FancyButton">
        {props.children}
    </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
