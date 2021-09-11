## 主要看header 组件

### src\redux\hooks.ts

通过TypedUseSelectorHook处理 react-redux 里的useSelector 

给他添加类型并返回

### useSelector可以拿到store里的数据

const language = useSelector((*state*) => *state*.language)

### import { useDispatch } from "react-redux";

const dispatch = useDispatch()

分发

let action = changeLanguageActionCreator('en')

dispatch(action)

