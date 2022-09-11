import {useNavigate} from "react-router-dom";
import {Button} from "antd";


function Demo() {
  const navigate = useNavigate()


  const go = () => {
    navigate("/home/newUserList")
  }
  return <div>
    demo
    <Button onClick={go}>去监控</Button>
  </div>
}
export  default Demo
