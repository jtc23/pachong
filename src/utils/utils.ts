// import {
//   enterprise_size,
//   enterprise_status,
//   pollution_source_type_data,
//   registration_capital_data,
//   registration_type_data,
// } from '@/utils/data';
//import { REG_EXP_BY_NUMBER } from '@/utils/regular';
import Cookies from "js-cookie";
import _, { cloneDeep, difference, find, isEmpty, isEqual, join, keys, map } from "lodash-es";
// import { getdownLoadUrl, getFiles } from "@/services/apiUpload";
import dayjs from "dayjs";
import React from "react";
import { isPROD } from "@/utils/environment";

/**
 * 判断一个对象中是否有值
 * @param data
 * @returns
 */
export function getDataValue(data: any) {
    if (!data) return false;
    const arr: any = Object.values(data)?.filter(el => el);
    if (Array.isArray(arr)) {
        return arr.flat(Infinity)?.filter(el => el)?.length ? true : false;
    }

    return arr?.length ? true : false;
}

/**
 * @name: Function tableKey
 * @test: 添加表格key值
 * @param {companyName:^data,current,pageSize}
 * @return:  ReactDOM
 */
export function tableKey(data, current, pageSize) {
    if (!data) return [];
    if (data.length) {
        for (var i = 0; i < data.length; i++) {
            data[i].key = (current - 1) * pageSize + i + 1;
        }
    }
}

/**
 * 判断两个对象值是否相等
 * @param data
 * @returns
 */
export function getDataisEqual(oldData, newData) {
    if (!oldData || !newData) return true;
    let newDataArr = Object.keys(newData);
    let oldNewObj = JSON.parse(JSON.stringify(oldData));
    let oldDataArr = Object.keys(oldNewObj);
    let arr = _.difference(oldDataArr, newDataArr);
    arr?.forEach(el => {
        delete oldNewObj[el];
    });
    //去除newData中 oldData中没有的key
    let newDataInfo = cloneDeep(newData);
    if (!isEmpty(keys(oldDataArr))) {
        const arr2 = difference(newDataArr, oldDataArr);
        arr2?.forEach(el => {
            delete newDataInfo[el];
        });
    }

    // console.log("----------------------对象比较-----------------------");
    // console.log(oldData, oldNewObj, "-------------旧对象值");
    // console.log(newData, "-------------新对象值");
    // console.log(getObjectIsNull(oldNewObj), getObjectIsNull(newData), "....................................");
    return isEqual(getObjectIsNull(oldNewObj), getObjectIsNull(newDataInfo));
}

/**
 * 判断对象是否使用一个空对象
 * @param data
 * @returns
 */
export function getObjectisNull(data: any): boolean {
    if (!data) return false;
    let arr = Object.keys(data);
    arr = arr?.filter(el => el !== "year");
    return arr?.length ? true : false;
}

/**
 * 删除为空的数据
 * @param data
 */
export function getObjectIsNull(data) {
    if (!data) return data;
    let obj = {};
    Object.keys(data)?.forEach(el => {
        if (data[el]) {
            obj[el] = data[el];
        }
    });

    return obj;
}

/**
 * 只允许输入数字
 * @param value
 */
export function setValue(value: React.ChangeEvent<HTMLInputElement>): string | undefined {
    const e = value.target.value;
    if (e) {
        return e?.replace(/[^\d||/.)]/g, "");
    }

    return undefined;
}

/**
 * 在cookie中添加值
 * @param key
 * @param token
 */
export function setCookies(key: string, token: string) {
    Cookies.set(key, token);
}

/**
 * 获取cookie中的值
 * @param key
 */
export function getCookies(key: string) {
    return Cookies.get(key);
}

/**
 * 删除cookie中的值
 * @param key
 */
export function removeCookies(key: string) {
    Cookies.remove(key);
}

/**
 * 获取2016年至今的年份
 */
export function getYear() {
    let year = new Date().getFullYear();
    let arr = [];
    for (let i = 2016; i <= year; i++) {
        arr.push({
            value: i,
            label: i + "年",
            year: i + 2016,
        });
    }
    return arr;
}

type SortProps = Record<string, any>;

type KeyProps =
    | {
        name: string;
        key: string;
    }[]
    | string;

type SortBy = {
    orderBy: any;
    orderAsc: any;
};


/**
 * 计算排序函数
 * @param {Object} sort table抛出的排序参数
 * @param {Object} key 需要排序的字段 {name: '字段名', key: '排序值'}  如果只有一个的话就是 string 类型的
 */
export const getSort = (sort: any, key: any): SortBy => {


    if (sort && Object.keys(sort)?.length) {
        const name = Object.keys(sort)[0];
        // console.log(Object.keys(sort));
        // const sortName = Array.isArray(key) ? key?.find(el => el.name == name)?.key : sort?.[key] ? 1 : undefined;
        const sortType = Array.isArray(key)
            ? sort[name] == "ascend"
                ? "asc"
                : sort[name] == "descend"
                    ? "desc"
                    : undefined
            : sort?.[key] == "ascend"
                ? "asc"
                : sort?.[key] == "descend"
                    ? "desc"
                    : undefined;
        return {
            sortName: name,
            sortType,
        };
    } else {
        return {
            sortName: undefined,
            sortType: undefined,
        };
    }

};

/**
 * 计算分页搜素逻辑
 */
export const getParams = params => {
    let arr = ["current", "pageSize"];

    let currentArr = difference(Object.keys(params), arr);
    if (currentArr?.length) {
        return params;
    } else {
        return params;
    }
};

/**
 * format完整的地址
 */
export function formatIntactAddress(values: any, data: any) {
    if (Object.hasOwn(data, "address")) {
        return `${data?.region}${data.address}`;
    }
    return values;
}

export const getTarget = (list: any[], code: number | string) => {
    return find(list, item => `${item.value}` === `${code}`);
};

// /**
//  * 获取企业状态
//  */
// export const getEnterPriseStatusByCode = (status: number | string) => {
//   return getTarget(enterprise_status, status)?.label || status;
// };

// /**
//  * 获取机构规模
//  */
// export const getEnterpriseSize = (code: any) => {
//   return getTarget(enterprise_size, code)?.label || code;
// };

// /**
//  * 获取企业登记注册类型
//  */
// export const getEnterpriseRegistrationType = (code: any) => {
//   return getTarget(registration_type_data, code)?.label || code;
// };

// /**
//  * 获取污染源类型
//  */
// export const getPollutionSourceType = (code: any) => {
//   return getTarget(pollution_source_type_data, code)?.label || code;
// };

// /**
//  * 获取注册资金
//  */
// export const getRegistrationCap = (unitCode: any, data: any) => {
//   const value = data?.regCap;
//   const targetUnit =
//     getTarget(registration_capital_data, unitCode)?.label || '';

//   return value ? `${value}${targetUnit}` : '无';
// };

/**
 * 通过文件list获取文件idString（以逗号隔开）
 * @param fileList
 */
type FileItem = { id: string; name?: string };
export const getFileIdsStrByFileList = (fileList: FileItem[]) => {
    return join(
        map(fileList, item => item?.id),
        ",",
    );
};

/**
 * 判断传入的时间是否过期，跟当前时间比较
 * @param time
 */
export const isPastDate = (time: any) => dayjs().valueOf() - dayjs(time).valueOf() > 0;

/**
 * 获取有效期限
 */
export const getExpirationDateStr = (values: any, data: any) => {
    return data?.endTime ? `${data?.startTime} 到 ${data?.endTime}` : "无";
};

/**
 * 将手机号中间4位转成****
 * @param tel
 */
export function transformPhone(tel: string) {
    const reg = /^(\d{3})\d{4}(\d{4})$/;
    return tel.replace(reg, "$1****$2");
}

// //验证码的rules
// export const CaptchaRules = [
//   {
//     required: true,
//     message: '验证码是必填项！',
//   },
//   {
//     max: 6,
//     message: '字数限制6字以内！',
//   },
//   {
//     pattern: REG_EXP_BY_NUMBER,
//     message: '验证码只能是数字！',
//   },
// ];
export let TOKEN_KEY = "token";
// const { RUN_ENV } = process.env;
// if (RUN_ENV === "eco") {
//     TOKEN_KEY = "X-Authenticated-Userid";
// }

/**
 * 设置为对象为空的属性为undefined
 */
export const setEmptyToUndefined = (obj: any) => {
    const keys = Object.keys(obj);
    keys.forEach(key => {
        if (obj[key] === "" || obj[key] === null) {
            obj[key] = undefined;
        }
    });
    return obj;
}

/**
 * 时间格式转换
 * @param date
 * @returns
 */
export function getMomentDate(date: string): any {
    if (!date) return undefined;
    const dateArr = date.match(/\d+/g)
    const length = dateArr?.length;
    let mode = "";
    let format = "";
    let resultFormat = "";
    if (length === 1) {
        mode = "year";
        format = "YYYY年";
        resultFormat = "YYYY"
    }

    if (length === 2) {
        mode = "month";
        format = "YYYY年MM月";
        resultFormat = "YYYY-MM"
    }

    if (length === 3) {
        mode = "";
        format = "YYYY年MM月DD日";
        resultFormat = "YYYY-MM-DD"
    }
    let value = "";
    value = `${dateArr?.[0]}-${dateArr?.[1] || "01"}-${dateArr?.[2] || "01"}`
    return {
        date: value,
        mode,
        format,
        formatValue: dayjs(date, format).format(resultFormat)
    }
}

/**
 * 去掉浮点数多余的0
 * @param num 
 * @returns 
 */
export function unifyNumber(num: number | string | undefined, tofixNumber = 4) {
    if (num === '') {
        return 0
    } else {
        let handleNum = parseFloat(num)
        let isToFixed = handleNum.toString().includes('.') && handleNum.toString().split('.')[1].length > 2
        if (isToFixed) {
            return handleNum.toFixed(tofixNumber)
        } else {
            return handleNum
        }
    }
}
// export const onSeeFile = (id: string) => {

//         if (id) {
//             getFiles({
//                 fileId: id,
//             }).then(res => {
//                 if (res?.code == 0) {
//                     fileView(null, {
//                         fileId: res?.data?.id,
//                         fullfilename: res?.data?.title,
//                     }).then((result: any) => {
//                         if (result) {
//                             window.open(result);
//                         }
//                     });
//                 }
//             });
//         }

// };


export const groupBy = (arr: any[]) => {
    return arr.reduce((pre, current, index) => {
        pre[current.primaryIndicator] = pre[current.primaryIndicator] || [];
        pre[current.primaryIndicator].push({ ...current });
        return pre;
    }, {});
}

export const getLength = (arr: any[]) => {
    let length = 0
    for (let i = 0; i < arr?.length; i++) {
        length += arr[i]?.children?.length + 1;
        // console.log( arr[i]?.children?.length,arr[i]);  
    }
    return length;
}
export const toFixed = (n: number, postion: number) => {
    if (!n) {
        return 0;
    } else {
        const str = String(n)
        if (str.indexOf(".") === -1) {
            return n
        } else {
            const a = str.split(".")
            if (a[1].length <= postion) {
                return n
            } else {
                let b = a[1].split("")
                if (Number(b[postion]) > 4) {
                    b[postion - 1] = String(Number(b[postion - 1]) + 1)


                }
                a[1] = b.slice(0, postion).join("")
                const res = a.join(".")
                return Number(res)
            }
        }
    }
    return 0;

}

export function calMax(arr, num = 0) {
    let max = Math.max(...arr);
    let maxint = Math.ceil(max / 9.5 + num); // 不让最高的值超过最上面的刻度
    let maxval = maxint * 10; // 让显示的刻度是整数

    // 为了防止数据为0时，Y轴不显示，给个最大值
    if (maxval == 0) { maxval = 1 }
    return maxval;
}

//计算最小值
export function calMin(arr) {
    let min = Math.min(...arr);
    let minint = Math.floor(min / 10);
    let minval = minint * 10;//让显示的刻度是整数
    return minval;
}

export function getValue (value) {
    const decimalPlaces = value.toString().split(".")[1]?.length || 0;
    if (decimalPlaces <= 2) {
      return value;
    } else {
      const res = value.toString().split(".");
      res[1] = res[1].slice(0, 2);
      return Number(res.join("."));
    }
  };