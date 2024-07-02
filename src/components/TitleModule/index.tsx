/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-11 11:05:07
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-04-10 14:17:00
 * @FilePath: \companyApplication\src\components\TitleModule\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import styles from "./index.module.less";
import cs from "classnames";

type TitleModuleProps = {
  title: string;
  extraNode?: React.ReactNode;
  rightRender?: React.ReactNode;
  className?: string;
};

const TitleModule = (props: TitleModuleProps) => {
  const { title, rightRender, className, extraNode } = props;

  return (
    <div className={cs([styles.title, className])}>
      <span style={{ display: "flex", alignItems: "center" }}>
        {title}
        {extraNode}
      </span>
      {rightRender}
    </div>
  );
};
export default TitleModule;
