### 去看store.ts 和middlewares/actionLog.ts

```typescript
 // applyMiddleware 简单源码
 const applyMiddleware = function(middleware: any) {
   let next = store.dispatch
   store.dispatch = middleware(store)(next)
 }

```

