import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";

interface PropsType {
  touristId: string
}
const DetailPage:React.FC<RouteComponentProps<PropsType>> = (props) => {
  let { touristId } = useParams<PropsType>()
  const [loading, setLoading] = useState<boolean>(true)
  const [product, setProduct] = useState(null)
  useEffect(() => {
    
  }, [])
  return <div>detail</div>
}
export default DetailPage 