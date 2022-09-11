import styles from "./style.module.scss"
import {Select} from "antd";
const { Option } = Select;
export default function ActionBar() {
  return <header className={styles["action-bar"]}>
    <div className={styles["bar-title"]}>
      分析
    </div>
    <Select
      placeholder="请选择项目"
      style={{
        width:"200px"
      }}
    >
      {
        [{value: 1, label: "小程序"}].map(item => {
          return <Option key={item.value} value={item.value}>{item.label}</Option>
        })
      }
    </Select>
  </header>
}
