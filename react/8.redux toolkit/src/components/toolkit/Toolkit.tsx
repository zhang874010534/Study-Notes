import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { productDetailSlice } from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
interface PropsType {

}
const Toolkit: React.FC<RouteComponentProps<PropsType>> = (prop) => {
  console.log(prop)
  const loading = useSelector(state => state.productDetailReducer.loading)
  const error = useSelector(state => state.productDetailReducer.error)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(productDetailSlice.actions.fetchStart())
    setTimeout(() => {
      dispatch(productDetailSlice.actions.fetchFail('请求失败了'))
    }, 4000);
  }, [])
  return <div>
    <div>{loading ? 'loading....' : ''}</div>
    <div>{error}</div>
  </div>
} 
export default Toolkit