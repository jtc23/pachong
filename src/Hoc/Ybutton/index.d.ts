/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-08-01 10:21:23
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2023-08-09 11:13:22
 * @FilePath: \caculator\src\Hoc\Ybutton\index.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { ButtonProps } from "antd/lib/button/button";
export type YbuttonType = ["default", "primary", "ghost", "dashed", "link", "text", "y_edit", "y_success", "y_error", "y-download", "y-export", "y-import", "y-delete"];
export interface YButtonProps extends ButtonProps {
    type: YbuttonType[number];
}
