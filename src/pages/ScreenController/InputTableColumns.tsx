/*
 * @description: 输入框列组件
 * @author: Yoke
 * @Date: 2024-04-10 10:55:55
 */
import YinputNumber from "@/Hoc/YinputNumber";

const InputTableColumns = (props: any) => {
    return (
        <YinputNumber
            type="number"
            places={2}
            value={props.value}
            onChange={props.onChange}
            bordered={false}
            allowClear={false}
            style={{ textAlign: 'center' }}
        />
    )
}
export default InputTableColumns;