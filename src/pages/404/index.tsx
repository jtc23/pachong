/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2024-03-04 10:12:06
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-03-19 16:06:09
 * @FilePath: \companyApplication\src\pages\404\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import styles from "./index.module.less";

function Page404() {
  return (
    <div className={styles.page404}>
      <img
        className={styles.page404_icon}
        src="https://u1.dl0.cn/images/l2963j.png"
        alt=""
        srcSet=""
      />
      <div className={styles.page404_text}>
        <h3>抱歉，您访问的页面不存在!</h3>
        <p>请确认链接地址是否正确后重新尝试</p>
      </div>
      <div
        className={styles.page404_button}
        onClick={() => {
          location.href = "/admin";
        }}
      >
        回到首页
      </div>
    </div>
  );
}

export default Page404;
