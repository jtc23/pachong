import { Select } from "antd"
import type { SelectProps } from "antd"
import cs from "classnames"
import styles from './index.module.less'
type SelectModifyProps = {
    children?: React.ReactNode;
} & SelectProps

const SelectModify = (props: SelectModifyProps) => {

    return <Select
        bordered={false}
        className={cs(styles.select)}
        allowClear={false}
        showArrow={false}
        popupClassName={styles.selectPopup}
        dropdownMatchSelectWidth={false}
        {...props}
    />
}
export default SelectModify