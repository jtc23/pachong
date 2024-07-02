/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-12-05 13:52:46
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2023-12-05 13:59:03
 * @FilePath: \caculator\src\utils\demcial.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Decimal from "decimal.js";


/**
 * 加法
 * @param a
 * @param b
 */
const addition = (a, b) => {
    let x = new Decimal(a || 0);
    let y =new Decimal(b || 0)
    let z = x.plus(y)
    return Number(z);
  };

  export {addition};
