/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-12-05 11:16:55
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2023-12-05 11:17:02
 * @FilePath: \caculator\src\utils\numerical.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import BigNumber from "bignumber.js";
import { flattenDeep } from 'lodash-es'

/**
 * 加法
 * @param a
 * @param b
 */
const addition = (a, b) => {
  let x = new BigNumber(a || 0);
  let y = x.plus(b || 0);
  return y;
};

/**
 * 减法
 * @param a
 * @param b
 */
const subtraction = (a, b) => {
  let x = new BigNumber(a || 0);
  let y = x.minus(b || 0);
  return y;
};

/**
 * 乘法
 * @param a
 * @param b
 */
const multiply = (a, b) => {
  let x = new BigNumber(a || 1);
  let y = x.multipliedBy(b || 1);
  return y;
};

/**
 * 除法
 * @param a
 * @param b
 */
const division = (a, b) => {
  let x = new BigNumber(a || 0);
  let y = x.dividedBy(b || 0);
  return y;
};

/**
 * 四舍五入
 * @param a
 * @param b
 */
const toFixeds = (a, b) => {
  let x = new BigNumber(a || 0);
  let y = x.toFixed(b || 0);
  return y;
};


/**
 * 多数据计算封装
 */
const curry = (type: string, ...args: any): string => {

  const argument = Array.prototype.slice.call(flattenDeep(args))?.map(el => el.toString());
  let result: string = "";

  switch (type) {
    case "+":
      result = argument.reduce((pre, cur) => {
        return addition(pre, cur);
      }, 0).toString()
      break;
    case "*":
      result = argument.reduce((pre, cur) => {
        return multiply(pre, cur ?? 1);
      }, 1)?.toString()
      break;
  }
  return result;
}

/**
 * 多数据计算
 */
function sumMultiply(...args: any[]) {
  return curry("*", ...args);
}

export { addition, subtraction, multiply, division, toFixeds, sumMultiply };

