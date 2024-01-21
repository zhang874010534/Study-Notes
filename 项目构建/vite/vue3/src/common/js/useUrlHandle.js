import {useLocalStorage, useUrlSearchParams} from '@vueuse/core'

const params = useUrlSearchParams('hash')
export const useUrlHandle = () => {
  const setLocalStorage = () => {
    for (const paramsKey in params) {
      const storage = useLocalStorage(paramsKey)
      storage.value = params[paramsKey]
    }
  }
  return {
    setLocalStorage
  }
}
