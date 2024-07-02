/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-08-30 09:28:52
 * @LastEditTime: 2023-10-09 10:21:09
 */
import styles from "./index.module.less";
interface ViewComponentFrameProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

const MangerFrame = (props: ViewComponentFrameProps) => {
  const { title, children } = props;

  return (
    <div className={styles.MangerFrame}>
      <div>
        <div className={styles.title}>{title}</div>
      </div>
      {children}
    </div>
  );
};

export default MangerFrame;
