/*
 * @Author: Jiangtianchi 936865249@qq.com
 * @Date: 2023-07-26 08:47:05
 * @LastEditors: Jiangtianchi 936865249@qq.com
 * @LastEditTime: 2024-05-24 15:53:18
 * @FilePath: \caculator\src\pages\Admin\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BackTop, ConfigProvider, Descriptions, Spin } from "antd";
import ProLayout from "@ant-design/pro-layout";
import type {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
  Settings,
} from "@ant-design/pro-layout";
import styles from "./index.module.less";
import {
  Link,
  Outlet,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Dropdown } from "antd";
import { LogoutOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import menuList from "@/routers/menu_list";
import Header from "./component/Header";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import classNames from "classnames";
import zhCN from "./zh_cn";
import HeaderContentRender from "./HeaderContentRender";
import { menus } from "./constant";
// import OpenAiLogo from "@/components/OpenAiLogo";
export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps["route"] & {
    authority: string[];
  };
  settings: Settings;
} & ProLayoutProps;

export type BasicLayoutContext = { [K in "location"]: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
  return menuList.map((item) => {
    return {
      ...item,
      name: item.name,
      path: item.path ?? "",
      key: item.menuId,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
  });
};
function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollBottm, setScrollBottm] = useState<Boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
  const timeRef = useRef<any>();
  const [path, setPath] = useState("/gov/policy");
  // useEffect(() => {
  //   console.log(menus);
  // }, [menus]);
  // if (!token) {
  //   return (
  //     <div
  //       style={{
  //         width: "100vw",
  //         height: "100vh",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       未登录
  //     </div>
  //   );
  // }
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);
  const menuDataRender = (menuList: any[]): any[] => {
    return menuList.map((item, index) => {
      return {
        ...item,
        name: item.name,
        path: item.path ?? "",
        key: index,
        children: item.children ? menuDataRender(item.children) : undefined,
      };
    });
  };

  const style: React.CSSProperties = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: "#1088e9",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  };
  const scorllHeight = () => {
    // console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 0) {
      setScrollBottm(true);
    } else {
      setScrollBottm(false);
    }
  };
  const scorllInner = () => {
    let timer: any = null;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        scorllHeight();
      }, 100);
    };
  };
  const onchangeValue = useCallback(scorllInner(), []);
  useEffect(() => {
    //滚动防抖
    window.addEventListener("scroll", (e) => {
      onchangeValue();
      //scrollRef.current = document.documentElement.scrollHeight - document.documentElement.clientHeight > document.documentElement.scrollTop;

      //console.log(document.documentElement.scrollHeight - document.documentElement.clientHeight > document.documentElement.scrollTop);
    });
  }, []);
  //滚动到底部
  const setIntervalFn = () => {
    const scrolH =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    timeRef.current = setInterval(() => {
      const sT = document.documentElement.scrollTop;
      if (sT > 0) {
        window.scrollTo(0, sT - 50);
      } else {
        clearInterval(timeRef.current);
      }
    }, 10);
  };
  return (
    <div className={styles.admin}>
      <ProLayout
        title=""
        logo={false}
        className={styles.mangerlayout}
        layout={"left"}
        location={{ pathname: path }}
        fixedHeader
        siderWidth={242}
        headerRender={HeaderContentRender}
        // fixSiderbar
        // headerRender={HeaderContentRender}
        headerHeight={60}
        // headerRender={() => {
        //   return <div>1111</div>;
        // }}
        // rightContentRender={Header}
        // route={menus}
        menuItemRender={(menuItemProps, defaultDom) => {
          return (
            <div
              className={classNames({
                [styles.menus_item]: true,
                [styles.pathActive]: location.pathname.includes(
                  menuItemProps?.path
                ),
              })}
              onClick={() => {
                navigate(menuItemProps?.path);
              }}
            >
              {menuItemProps?.name}
            </div>
          );
        }}
        // itemRender={(route, params, routes, paths) => {
        //   const first = routes.indexOf(route) === 0;
        //   return first ? (
        //     <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
        //   ) : (
        //     <span>{route.breadcrumbName}</span>
        //   );
        // }}
        footerRender={false}
        menuDataRender={() => menuDataRender(menus ?? [])}
        collapsedButtonRender={false}
        breadcrumbRender={() => []}
      >
        {/* <Spin spinning={loading}> */}
        <ConfigProvider locale={zhCN}>
          <Outlet />
        </ConfigProvider>

        {/* </Spin> */}
        {/* <div
          className={classNames({
            [styles.toBottom]: true,
            [styles.visible]: !scrollBottm,
            // document.documentElement.scrollHeight - document.documentElement.clientHeight == document.documentElement.scrollTop,
          })}
          onClick={() => {
            setIntervalFn();
          }}
        >
          <VerticalAlignTopOutlined className={styles.backTop} />
        </div> */}
        {/* <BackTop
          // visibilityHeight={200}
          style={{
            right: 20,
            width: 50,
            height: 50,
            bottom: 80,
          }}
        >

        </BackTop> */}
        {/* <PageContainer
          style={{ padding: "86px 24px 24px", backgroundColor: "#F5F5F5" }}
        >
          <Header />
          <div style={{ backgroundColor: "#FFFFFF" }}>
            <Outlet />
          </div>
        </PageContainer> */}
        {/* <Header />
        <Outlet /> */}
      </ProLayout>
    </div>
  );
}

export default AdminPage;
