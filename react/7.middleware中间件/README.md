### 去看redux/store.ts 和redux/middlewares/actionLog.ts

```typescript
 // applyMiddleware 简单源码
 const applyMiddleware = function(middleware: any) {
   let next = store.dispatch
   store.dispatch = middleware(store)(next)
 }

```

### 异步方法giveMeDataCreator

在 src\redux\recommendReducer\recommendAction.ts

