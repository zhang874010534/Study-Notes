import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { productDetailSlice, getProductDetail } from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
interface PropsType {
  id: string
}
const Toolkit: React.FC<RouteComponentProps<PropsType>> = (prop) => {
  // console.log(prop)
  const loading = useSelector(state => state.productDetailReducer.loading)
  const data = useSelector(state => state.productDetailReducer.data)
  const error = useSelector(state => state.productDetailReducer.error)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductDetail(prop.match.params.id))
    // dispatch(productDetailSlice.actions.fetchStart())
    // setTimeout(() => {
    //   dispatch(productDetailSlice.actions.fetchFail('请求失败了'))
    // }, 4000);
  }, [])
  return <div>
    <div>{loading ? 'loading....' : ''}</div>
    <div>{data}</div>
    <div>{error}</div>
  </div>
} 
export default Toolkit