/*
 * @Descripttion: 提示
 * @Author: yoke
 * @Date: 2021-10-15 14:03:19
 */
import styles from "./index.module.less";
interface InfoTitleProps {
  title?: string | number;
  tips?: string;
}

const MangerInfoTitle = (props: InfoTitleProps) => {
  const { title, tips } = props;

  return (
    <div className={styles.titlewrap}>
      <h2>
        {title} <span>{tips}</span>
      </h2>
    </div>
  );
};

export default MangerInfoTitle;
