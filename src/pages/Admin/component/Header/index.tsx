/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-07-31 16:04:53
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-03-07 10:35:19
 * @FilePath: \caculator\src\pages\Admin\component\Header\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Dropdown, Menu, MenuProps, Space } from "antd";
import styles from "./index.module.less";
import { DownOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "1":
      case "2":
        // const url = "/m/resetpassword";
        // history.push(url);
        break;
      case "3":
        // logout();
        navigate("/login");

        break;
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
      <Menu.Item key="2">
        <span className={styles.item}>使用手册下载</span>
      </Menu.Item>
      <Menu.Item key="3">
        <span className={styles.item}>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.head}>
      {/* <div className={styles.head_bread}></div> */}
      <div className={styles.head_menu}>
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ color: "#ccc" }}>
              <img src={"/home_img/user.png"} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
