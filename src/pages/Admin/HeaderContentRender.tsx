/*
 * @Description:
 * @Author: tianchi
 * @Date: 2022-08-22 10:37:20
 * @LastEditTime: 2024-05-27 09:01:29
 */
import { Dropdown, Menu, Space } from "antd";
import styles from "./index.module.less";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { userStore } from "@/store";
// import RightContent from "./RightContent";

const HeaderContentRender = () => {
  const navigate = useNavigate();
  const { logout, user_name } = userStore();
  const onClick = ({ key }) => {
    switch (key) {
      case "1":
        logout();
        navigate("/login");
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      {/* <Menu.Item key="1">
			<EditOutlined />
			<span className={styles.item}>账户信息</span>
		</Menu.Item> */}

      <Menu.Item key="1">
        <span className={styles.item}>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.headers}>
      <div className={styles.logo}>
        <h2>政策法规</h2>
        {/* <span>{user_name}，欢迎您登录企业能耗在线监测平台</span> */}
      </div>

      <div className={styles.user}>
        {/* <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <img src={"/home_img/user.png"} />
          </a>
        </Dropdown> */}
      </div>
    </div>
  );
};
export default HeaderContentRender;
