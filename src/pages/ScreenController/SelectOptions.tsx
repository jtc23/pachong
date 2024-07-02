/*
 * @description: 选择年份
 * @author: Yoke
 * @Date: 2024-04-10 10:55:55
 */
import { Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const START_YEAR = 2024;

const END_YEAR = dayjs().year();

const list = Array.from({ length: END_YEAR - START_YEAR + 1 }, (v, k) => {
    return {
        label: `${START_YEAR + k}年`,
        value: `${START_YEAR + k}`,
        title: `${START_YEAR + k}年`
    }
});

const SelectOptions = (props: any) => {
    const [selectedOption, setSelectedOption] = useState<any>(list);
    useEffect(() => {
        const years = props['2'].getFieldValue('table').map((item: any) => item.year).filter(Boolean);
        // 禁用已经选择的年份
        setSelectedOption(list.map((item: any) => {
            if (years.includes(item.value)) {
                return {
                    ...item,
                    disabled: true
                }
            }
            return item;
        }));
    }, [props.value])
    return (
        <Select
            placeholder="请选择"
            options={selectedOption}
            value={props.value}
            onChange={props.onChange}
            bordered={false}
        />
    )
}
export default SelectOptions;