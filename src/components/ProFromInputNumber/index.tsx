/*
 * @Descripttion: from inputNumber
 * @Author: yoke
 * @Date: 2021-10-25 17:35:31
 */

import { ECOInputNumber } from "@/Hoc/TooltipInput";
import ProForm from "@ant-design/pro-form";

const ProFromInputNumber = (props: any) => {
  let {
    max = 99999999.999999,
    min = 0.000001,
    isZero,
    automaticMax,
    automaticMin,
    placesNumber,
  } = props;
  max = String(max);
  min = String(min);
  const validator = (_, value: number) => {
    let num = value * 1;
    if (num && max && num > max) {
      return Promise.reject(new Error(`最大值为${max}`));
    }

    if (num && min && min > num) {
      return Promise.reject(new Error(`最小值为${min}`));
    }

    if (isZero) {
      if (num * 1 == 0) {
        return Promise.reject(new Error(`不能为0`));
      }
    }
    return Promise.resolve();
  };
  let places: any = 0;
  if (automaticMax) {
    places = placesNumber;
  } else {
    places =
      max && typeof max === "string" && max?.includes?.(".")
        ? max?.split(".")?.[1]?.length
        : "";
  }

  return (
    <ProForm.Item
      {...props}
      style={{ width: "auto" }}
      rules={[...props.rules, { validator }]}
      tooltip={false}
    >
      <ECOInputNumber type="number" places={places} {...props} />
    </ProForm.Item>
  );
};

const isEqualTooltipWithInput = (prevProps: any, nextProps: any) => {
  if (prevProps.value === nextProps.value) return true;
  return false;
};

export default ProFromInputNumber;
