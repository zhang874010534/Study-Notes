import {useCallback, useRef, useState} from "react";
import {useUnmount} from "ahooks";

function useRafState(initialState) {
  const ref = useRef(0)
  const [state, setState] = useState(initialState)

  const setRafState = useCallback((value) => {
    cancelAnimationFrame(ref.current)
    ref.current = requestAnimationFrame(() => {
      setState(value)
    })
  }, [])

  useUnmount(() => {
    cancelAnimationFrame(ref.current)
  })
  return [state, setRafState]
}
export default useRafState
